import React from 'react';
import GDBActions from './GDBActions.js';
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/lib/codemirror.css';
import {RegisterDataStoreCallback, UnregisterDataStoreCallback, GetDataStore} from './DataStore.js';

class CodeView extends React.Component
{
    constructor(props)
    {
	super(props);
	this.got_code = false;
	this.sent_code_request = false;
	this.editor = null;
	this.filename = props.FileName;
	this.fullfilename = props.FullFileName;
	this.state = {frameinfo : {}, programstate : "", breakpoints:{}};

	this._callback = this._OnDataStoreChanged.bind(this);
	RegisterDataStoreCallback(this._callback);
    }

    GetFileName()
    {
	return this.filename;
    }

    GetFullFileName()
    {
	return this.fullfilename;
    }
    
    _InitializeCodeViewIfNeeded(store)
    {
	if (this.got_code)
	    return;
	
	if (store.Sources[this.GetFullFileName()] != undefined)
	    {
		this.sent_code_request = true;
		this.editor.doc.setValue(store.Sources[this.GetFullFileName()]);
		this.editor.refresh();
		this.got_code = true;
		return;
	    }

	if (this.sent_code_request)
	    return;
	
	GDBActions.RequestSourceFile(this.GetFullFileName());
	this.sent_code_request = true; 
    }
    
    _OnDataStoreChanged(store)
    {
	if (this.editor !=null)
	    this.editor.refresh();
	
	this._InitializeCodeViewIfNeeded(store);
	this._PopulateControl(store);
    }

    _PopulateControl(store)
    {
	this.setState({frameinfo : store.ProgramFrameInformation, programstate : store.ProgramState, breakpoints : store.Breakpoints});

	this._PopulateView();
    }

    
    _PopulateView()
    {
	this.editor.clearGutter("breakpoints");

	this._FillBreakpoints();
	
	if (this.state.frameinfo.fullname == this.GetFullFileName())
	   if (this.state.programstate == "Stopped")
	    this.editor.setGutterMarker(parseInt(this.state.frameinfo.line) - 1, "breakpoints", this._CreateActiveLineElement(this._IsActiveLineWithBreakpoint()));

	
    }

    _FillBreakpoints()
    {

	for (let i = 0; i < this.state.breakpoints.length; ++i)
	{
	    let bkpt = this.state.breakpoints[i];
	    if (bkpt.fullname == this.GetFullFileName())
		this.editor.setGutterMarker(parseInt(bkpt.line) - 1, "breakpoints", this._CreateBreakpointElement(bkpt.enabled == "y"));
	}
    }

    _IsActiveLineWithBreakpoint()
    {

	if (this.state.frameinfo.line == undefined)
	    return;
	
	return this._FindBreakpointByLine(this.state.frameinfo.line) != null;
    }

    _FindBreakpointByLine(line)
    {
	for (let i = 0; i < this.state.breakpoints.length; ++i)
	{
	    let bkpt = this.state.breakpoints[i];
	    if (bkpt.fullname == this.GetFullFileName() && bkpt.line == line)
		return this.state.breakpoints[i];
	}

	return null; 
    }

    _CreateBreakpointElement(enabled)
    {
	let wrapping_div = document.createElement("div");

	if (enabled)
	    wrapping_div.style.color="red";
	else
	    wrapping_div.style.color="gray";
	wrapping_div.innerText="●";
	return wrapping_div;
    }
    
    _CreateActiveLineElement(is_breakpoint)
    {
	let wrapping_div = null;

	if (is_breakpoint)
	    wrapping_div = this._CreateBreakpointElement();
	else
	    wrapping_div = document.createElement("div");

	let span = document.createElement("span");
	span.className="glyphicon glyphicon-arrow-right";
	span.style.color = "gold";
	span.style.zIndex = 99;
	span.style.position = "absolute";
	span.style.left = "0px";
	span.style.top="3px";

	wrapping_div.appendChild(span);

	return wrapping_div;
    }

    _OnGutterClick(editor, line)
    {
	let bkpt = this._FindBreakpointByLine(line + 1);
	if (bkpt == null)
	    GDBActions.AddBreakpointBySource(this.GetFullFileName(), line + 1);
	else
	    GDBActions.RemoveBreakpoint(bkpt.number);
    }
    
    componentDidMount()
    {
	this.editor = CodeMirror(this.refs["codeview_"+this.state.fullfilename], {mode: "text/x-c++src", readOnly : true, lineNumbers: true, gutters : ["breakpoints"]});

	this.editor.on("gutterClick", this._OnGutterClick.bind(this)); 
	this._InitializeCodeViewIfNeeded(GetDataStore().Store);
    }

    componentWillUnmount()
    {
	UnregisterDataStoreCallback(this._callback);
    }
    
    render()
    {
	let obj = <div ref={"codeview_"+this.state.fullfilename}></div>;

	return obj;
    }
}

export default CodeView;
