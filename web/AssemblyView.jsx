import React from 'react';
import GDBActions from './GDBActions.js';
import EditableTextbox from './GUIUtilities/EditableTextbox/EditableTextbox.jsx'
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/gas/gas.js';
import 'codemirror/lib/codemirror.css';
import {RegisterDataStoreCallback, UnregisterDataStoreCallback, GetDataStore} from './DataStore.js';

class AssemblyView extends React.Component
{
    constructor(props)
    {
	super(props);
    }
    
   
    _OnDataStoreChanged(store)
    {
	if (this.editor !=null)
	    this.editor.refresh();

	this._PopulateControl(store);
    }

    
    _PopulateControl(store)
    {	
	this.setState({frameinfo : store.ProgramFrameInformation, programstate : store.ProgramState, breakpoints : store.Breakpoints, instructions : store.Disassembly.Data});

	this._PopulateAssemblyContent(store.Disassembly.Data);
	this._PopulateGutters();

	this.editor.refresh();
    }

    _PopulateAssemblyContent(assembly_instructions)
    {
	let val = assembly_instructions.reduce((str, cur) => str + cur.inst + "\n", "");
	
	this.editor.doc.setValue(val.slice(0, -1));
    }
    
    _PopulateGutters()
    {
	this.editor.clearGutter("breakpoints");

	this._FillBreakpoints();

	if (this.state.programstate == "Stopped")
	{
	    let active_line  = this._FindLineByAddress(this.state.frameinfo.addr);

	    if (active_line != -1)
		this.editor.setGutterMarker(active_line, "breakpoints", this._CreateActiveLineElement(this._IsActiveLineWithBreakpoint()));
	}
    }

    _FillBreakpoints()
    {
	for (let i = 0; i < this.state.breakpoints.length; ++i)
	{
	    let bkpt = this.state.breakpoints[i];

	    let insn = this.state.instructions.findIndex((insn) => bkpt.addr == insn.address);

	    if (insn != -1)
		this.editor.setGutterMarker(insn, "breakpoints", this._CreateBreakpointElement(bkpt.enabled == "y"));
	}
    }

    _IsActiveLineWithBreakpoint()
    {
	if (this.state.frameinfo.line == undefined)
	    return;
	
	return this._FindBreakpointByLine(this.state.frameinfo.line) != null;
    }

    _FindLineByAddress(address)
    {
	if (this.state.instructions == undefined || this.state.instructions == null)
	    return;

	return this.state.instructions.findIndex((insn) => insn.address == address);
    }

    _FindBreakpointByLine(line)
    {
	if (this.state.instructions[line] == undefined)
	    return null;
	
	for (let i = 0; i < this.state.breakpoints.length; ++i)
	{
	    let bkpt = this.state.breakpoints[i];
	    if (bkpt.addr == this.state.instructions[line].address)
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
	let bkpt = this._FindBreakpointByLine(line);
	if (bkpt == null)
	    GDBActions.AddBreakpointByAddress(this.state.instructions[line].address);
	else
	    GDBActions.RemoveBreakpoint(bkpt.number);
    }
    
    componentDidMount()
    {
	RegisterDataStoreCallback(this._OnDataStoreChanged.bind(this));
	
	this.editor = CodeMirror(this.refs["codeview_assemblyview"], {mode: "gas", architecture: "x86", readOnly : true, lineNumbers: true, lineNumberFormatter: this._CodeMirrorLineNumberFormatter.bind(this), gutters : ["breakpoints"]});

	this.editor.on("gutterClick", this._OnGutterClick.bind(this)); 
    }

    componentWillUnmount()
    {
	UnregisterDataStoreCallback(this._callback);
    }

    _CodeMirrorLineNumberFormatter(num)
    {
	if (this.state == null || this.state.instructions == null || this.state.instructions[num - 1] == undefined)
	    return String(num);
	
	return this.state.instructions[num - 1].address;
    }

    _OnInput(input)
    {
	GDBActions.Disassemble(input);
    }
    
    render()
    {
	let obj = (
	<div>
	<EditableTextbox WithBorder={true} onChange={this._OnInput.bind(this)}/>
<div ref="codeview_assemblyview"></div>
        </div>
);
	return obj;
    }
}

export default AssemblyView;
