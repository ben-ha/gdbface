import React from 'react';
import {RegisterDataStoreCallback} from './DataStore.js';

class PlainConsole extends React.Component
{
    constructor(props)
    {
	super(props);
	this.store_member = props.Output;
	this.max_length = props.MaxLength;
	this.onNewLine = props.OnNewLine;
	this.echo = props.Echo;
	this.prompt = props.Prompt;
	this.state = {output : ""};
    }

    componentDidMount()
    {
	RegisterDataStoreCallback(this._OnGDBData.bind(this));
    }

    _TrimOutput(output)
    {
	if (this.max_length == undefined || this.max_length == null || this.max_length == 0)
	   return output;
	   
	if (output.length > this.max_length)
	   return output.substr(-this.max_length);

	return output;
    }

    _OnGDBData(store)
    {
        if (!store[this.store_member].Changed)
	   return;

	let new_output = this.state.output + store[this.store_member].Data;
	this.setState({output : new_output});
    }

    componentDidUpdate(prevProps, prevState)
    {
	let text_area = document.getElementById("console_" + this.store_member);

	text_area.scrollTop = text_area.scrollHeight;
    }

    _OnChange(e)
    {
	this.setState({input:e.target.value});
    }

    _OnKeyDown(event)
    {
      if (event.keyCode == 13)
      {
	 let line = this.state.input;
         this.onNewLine(line);
	 this.setState({input:""});

	 if (this.echo)
	 {
		let newline_needed = "";
		if (this.state.output != "")
		   newline_needed = "\n";
		   
		let output = this.state.output + newline_needed + this.prompt + " " + line + "\n";
		this.setState({output : output});
	 }
      }
    }

    render()
    {
	// TODO: Fix to use EditableTextbox instead of an input that handles Enter key
	   return (
		<div className="form-group">
		   <textarea className="form-control" rows="4" id={"console_" + this.store_member} value={this.state.output} readOnly/>
		   <input className="form-control" type="text" value={this.state.input} onChange={this._OnChange.bind(this)} onKeyDown={this._OnKeyDown.bind(this)} />
		</div>
		    );
	}
}

export default PlainConsole;
