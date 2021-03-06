"use strict"
// TODO: Add escaping support? Currently OMD

var API = require('./API.js');

class GDBOutput
{
    constructor(type, id, data)
    {
	this.Type = type;
	this.ID = id;
	this.Data = data;
    }
};

class GDBOutputParser
{
    constructor()
    {

    }

    Parse(output)
    {
	let output_trimmed = output.trim();

	let parts = this._GetGDBOutputParts(output_trimmed);
	let rescode = "INFERIOR";
	let restext = "";
	let result = "";
	let resid = "";

	if (parts != null)
	{
	    resid = parts[1];
	    rescode = parts[2];
	    restext = parts[3];
	    result = parts[4];
	}

	switch (rescode)
	{
	    case '^':
	    return this._HandleResultRecords(resid, restext, result);
	    case '~':
	    return new GDBOutput(API.results.GDB_CONSOLE_OUTPUT, resid, result);
	    default:
	    return new GDBOutput(API.results.GDB_ASYNC_OUTPUT, resid, this._HandleAsyncOutput(restext, result));
	}
    }

    IsGDBCommand(output)
    {
	let matched = output.match(/^[0-9]*[\^*~@&\+=].*/);

	return matched != null;
    }
    
    _GetGDBOutputParts(trimmed_output)
    {
	if (trimmed_output[0]=="~") // console case
	{
	    let matched = trimmed_output.match(/(~)"(.*)"/);
	    return [matched[0], 0, matched[1], "", matched[2].replace("\\n", "\n").replace("\\t", "\t")];
	}
	let matched = trimmed_output.match(/^([0-9]*)([\^*~@&\+=])([A-Za-z-]+),(.*)/);
	if (matched == null)
	{
	    matched = trimmed_output.match(/^([0-9]*)([\^*~@&\+=])([A-Za-z-]+)/);
	}

	return matched;
    }

    _HandleResultRecords(resid, restext, result)
    {
	if (restext == "error")
	    return new GDBOutput(API.results.GDB_ERROR, resid, result);
	if (restext == "done")
	    return new GDBOutput(API.results.GDB_RESULT_RECORD, resid, this._HandleDoneResult(result));
    }

    _HandleAsyncOutput(restext, result)
    {
	let obj = {};
	obj[restext] = this._BuildObjectFromAsyncRecords(result);
	return obj;
    }

    _BuildObjectFromAsyncRecords(result)
    {
	let dict = {};

	while(result != "")
	{
	    let token_end_index = this._GetNextCommaToken(result);
	    Object.assign(dict, this._BuildObjectFromResultRecords(false, result.substr(0, token_end_index)));

	    result = result.substr(token_end_index);
	}

	return dict;	
    }
    
    _HandleDoneResult(result)
    {
	return this._BuildObjectFromResultRecords(false, result);
    }

    _BuildObjectFromResultRecords(var_in_list, result)
    {
	if (result == undefined || result == null)
	    return "";

	let variable = result.trim();
	let varname = "";
	
	let var_info = this._GetVariableInfo(variable);

	if (var_info != null)
	{
	    varname = var_info[0];
	    variable = var_info[1];
	}

	let obj = null;
	
	switch(variable[0])
	{
	    case '{':
	       obj = this._BuildDictionaryFromResultRecords(variable);
	    break;
	    case '[':
               obj = this._BuildListFromResultRecords(variable);
	    break;
	    case '"':
	       variable = variable.substr(1);
	       obj = variable.substr(0, variable.indexOf('"'))
	    break;
	}

	if (var_in_list)
	    return obj;

	result = {};
	result[varname] = obj;
	return result;
  }

    _BuildDictionaryFromResultRecords(varval)
    {
	let dict = {};

	let dict_str = varval.substr(1, this._GetEndOfDictionary(varval) - 1); // Skip {}

	while(dict_str != "")
	{
	    let token_end_index = this._GetNextCommaToken(dict_str);
	    Object.assign(dict, this._BuildObjectFromResultRecords(false, dict_str.substr(0, token_end_index)));

	    dict_str = dict_str.substr(token_end_index);
	}

	return dict;
    }

    _BuildListFromResultRecords(varval)
    {
	let list = [];
	let list_str = varval.substr(1, this._GetEndOfList(varval) - 1); // Skip []

	while(list_str != "")
	{
	    let token_end_index = this._GetNextCommaToken(list_str);
	    let obj = this._BuildObjectFromResultRecords(true, list_str.substr(0, token_end_index));

	    if (obj != null) // I observed it cannot be
	    {
		list.push(obj);
	    }

	    list_str = list_str.substr(token_end_index + 1);
	}

	return list;
    }

    _GetNextCommaToken(str)
    {
	let i = 0;
	let paused = false;
	
	do
	{
	    if (str[i] == '"')
	    {
		paused = !paused;
		++i;
		continue;
	    }

	    if (paused)
	    {
		++i;
		continue;
	    }
	    
	    if (str[i] == '{')
		i += this._GetEndOfDictionary(str.substr(i));
	    else if (str[i] == '[')
	    {
		i += this._GetEndOfList(str.substr(i));
	    }
	    else
		++i;
	} while(i < str.length && (str[i] != ',' || paused));

	return i;
    }

    _GetEndOfDictionary(str)
    {
	return this._GetEndOfType('{', '}', str);
    }

    _GetEndOfList(str)
    {
	return this._GetEndOfType('[', ']', str);
    }
    
    _GetEndOfType(opening_char, closing_char, str)
    {
	let i = 0;
	let count = 0;
	let paused = false;
	do
	{
	    if (str[i] == '"')
	    {
		paused = !paused;
		++i;
		continue;
	    }

	    if (paused)
	    {
		++i;
		continue;
	    }
	    
	    if (str[i] == opening_char)
		count++;
	    
	    if (str[i] == closing_char)
		count--;
	    
	    ++i;
	    
	} while(count > 0 && i != str.length);

	if (count != 0)
	    throw "Bad parsing";

	return i;
    }
    
    _GetVariableInfo(text)
    {
	let splitted = text.match(/^,?([_\-A-Za-z0-9]+)=(.*)/);
	if (splitted == null)
	    return null;
	return [splitted[1],splitted[2]];
    }
}

module.exports.GDBOutputParser = GDBOutputParser;
module.exports.GDBOutput = GDBOutput;
