import React from 'react';
import GDBActions from './GDBActions.js';
import EditableTextbox from './GUIUtilities/EditableTextbox/EditableTextbox.jsx'
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/gas/gas.js';
import 'codemirror/lib/codemirror.css';
import {RegisterDataStoreCallback, UnregisterDataStoreCallback, GetDataStore} from './DataStore.js';
import Utilities from './GUIUtilities/Utilities.js';

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
	// There is no need for react setState because I manually update the view
	// Also setState is asynchronous which is a pain
	this.frameinfo = store.ProgramFrameInformation;
	this.programstate = store.ProgramState;
	this.breakpoints = store.Breakpoints;
	this.instructions = store.Disassembly.Data;

	this._PopulateAssemblyContent(this.instructions);
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

	let active_line = -1;
	
	if (this.programstate == "Stopped" && this.frameinfo != undefined)
	{
	    active_line  = this._FindLineByAddress(this.frameinfo.addr);

	    if (active_line != -1)
		this.editor.setGutterMarker(active_line, "breakpoints", Utilities.CreateLineMarkerElement({active_line : true}));
	}

	for (let i = 0; i < this.breakpoints.length; ++i)
	{
	    let bkpt = this.breakpoints[i];

	    let insn = this.instructions.findIndex((insn) => bkpt.addr == insn.address);
	    
	    if (insn != -1)
		this.editor.setGutterMarker(insn, "breakpoints", Utilities.CreateLineMarkerElement({has_breakpoint : true, breakpoint_enabled : bkpt.enabled == "y", active_line : active_line == insn}));
	}

    }

    _FindLineByAddress(address)
    {
	if (this.instructions == undefined || this.instructions == null)
	    return;

	return this.instructions.findIndex((insn) => insn.address == address);
    }

    _FindBreakpointByLine(line)
    {
	if (this.instructions[line] == undefined)
	    return null;
	
	for (let i = 0; i < this.breakpoints.length; ++i)
	{
	    let bkpt = this.breakpoints[i];
	    if (bkpt.addr == this.instructions[line].address)
		return this.breakpoints[i];
	}

	return null; 
    }
    
    _OnGutterClick(editor, line)
    {
	let bkpt = this._FindBreakpointByLine(line);
	if (bkpt == null)
	    GDBActions.AddBreakpointByAddress(this.instructions[line].address);
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
	if (this.instructions == null || this.instructions[num - 1] == undefined)
	    return String(num);
	
	return this.instructions[num - 1].address;
    }

    _OnInput(input)
    {
	GDBActions.Disassemble(input);
    }

    _ChangeDisassemblyFlavor(is_intel)
    {
	GDBActions.SetDisassemblyFlavor(is_intel);

	if (this.input != undefined && this.input != null)
	    GDBActions.Disassemble(this.input);
    }
    
    render()
    {
	let obj = (
	<div>
	    <EditableTextbox WithBorder={true} onChange={this._OnInput.bind(this)} updateOnEnter={true} />
	    <label className="radio-inline"><input type="radio" name="asmflavor" onChange={this._ChangeDisassemblyFlavor.bind(this,false)} defaultChecked/>AT&T</label>
	    <label className="radio-inline"><input type="radio" name="asmflavor" onChange={this._ChangeDisassemblyFlavor.bind(this, true)} />Intel</label>
<div ref="codeview_assemblyview"></div>
        </div>
);
	return obj;
    }
}

export default AssemblyView;
