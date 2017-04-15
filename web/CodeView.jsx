import React from 'react';
import ReactDOM from 'react-dom';
import GDBActions from './GDBActions.js';
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/lib/codemirror.css';
import {RegisterDataStoreCallback, UnregisterDataStoreCallback, GetDataStore} from './DataStore.js';
import Utilities from './GUIUtilities/Utilities.js';
import Tooltip from './GUIUtilities/Tooltip/Tooltip.jsx';
import VariableTooltip from './VariableTooltip.jsx';

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
		this._InitializeTooltips();
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

		let active_file = (this.state.programstate == "Stopped") && (this.state.frameinfo.fullname == this.GetFullFileName());

	let seen_breakpoint_on_active_line = false;
	
	for (let i = 0; i < this.state.breakpoints.length; ++i)
	{
	    let bkpt = this.state.breakpoints[i];
	    
	    if (bkpt.fullname == this.GetFullFileName())
		{
		    let active_line = active_file && (this.state.frameinfo.line == bkpt.line);
		    if (!seen_breakpoint_on_active_line)
			seen_breakpoint_on_active_line = active_line; 
		    let bkpt_state = {has_breakpoint : true, breakpoint_enabled : bkpt.enabled == "y", active_line : active_line};	    
		this.editor.setGutterMarker(parseInt(bkpt.line) - 1, "breakpoints", Utilities.CreateLineMarkerElement(bkpt_state));
		}
	}

	if (!active_file || seen_breakpoint_on_active_line)
	    return;

	// We are in the right file and no breakpoint has been put on the active line
	this.editor.setGutterMarker(parseInt(this.state.frameinfo.line) - 1, "breakpoints", Utilities.CreateLineMarkerElement({active_line : true}));
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

    _OnGutterClick(editor, line)
    {
	let bkpt = this._FindBreakpointByLine(line + 1);
	if (bkpt == null)
	    GDBActions.AddBreakpointBySource(this.GetFullFileName(), line + 1);
	else
	    GDBActions.RemoveBreakpoint(bkpt.number);
    }

    _InitializeTooltips()
    {
	let root_node = this.refs["codeview_"+this.state.fullfilename];

	let elements = root_node.getElementsByClassName("cm-variable");

	for (let i = 0; i < elements.length; ++i)
	    {
		elements[i].onmouseover = () => this._OnVariableMouseOver.bind(this)(elements[i]);
		elements[i].onmouseout = () => this._OnVariableMouseOut.bind(this)(elements[i]);
	    }
    }

    _OnVariableMouseOver(element)
    {
	element._hovering = true;
	
	if (element._tooltip == undefined)
	    {
		let tooltip_span = document.createElement("span");
		element.appendChild(tooltip_span);
		element.style.position = "relative";

		element._tooltip = ReactDOM.render((<Tooltip></Tooltip>), tooltip_span);

		element._tooltipContent = ReactDOM.render((<VariableTooltip Expression={element.firstChild.data} />), ReactDOM.findDOMNode(element._tooltip));
	    }

	if (element._timeout_executing)
	    return;

	element._timeout_executing = true;
	
	setTimeout(() => {    
	    if (!element._hovering)
		{
		    element._timeout_executing = false;
		    return;
		}

	    element._tooltip.Display();
	    element._tooltipContent.Reevaluate();

	    element._timeout_executing = false;
	    }, 1000);
    }
    
    _OnVariableMouseOut(element)
    {
	element._hovering = false;
	
	if (element._tooltip == undefined)
	    return;

	element._tooltip.Hide();
    }
    
    componentDidMount()
    {
	this.editor = CodeMirror(this.refs["codeview_"+this.state.fullfilename], {mode: "text/x-c++src", readOnly : true, lineNumbers: true, gutters : ["breakpoints"]});

	this.editor.setSize(null, "100%");
	this.editor.on("gutterClick", this._OnGutterClick.bind(this)); 
	this._InitializeCodeViewIfNeeded(GetDataStore().Store);
    }

    componentWillUnmount()
    {
	UnregisterDataStoreCallback(this._callback);
    }
    
    render()
    {
	let obj = <div ref={"codeview_"+this.state.fullfilename} style={{position:"relative", height: "100%"}}></div>;

	return obj;
    }
}

export default CodeView;
