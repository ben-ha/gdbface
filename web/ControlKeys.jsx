import React from 'react';
import GDBActions from './GDBActions.js';
import {RegisterDataStoreCallback} from './DataStore.js';

class ControlKeys extends React.Component
{
	constructor(props)
	{
	    super(props);
	    this.paused = false;
	    this.started = false;
	}

    componentDidMount()
    {
	RegisterDataStoreCallback(this._OnDataStoreChanged.bind(this));
    }
    
    _OnDataStoreChanged(store)
    {

	this.started = (store.ProgramState != "NotStarted" && store.ProgramState != "Terminated");
	this.paused = store.ProgramState == "Stopped";
    }

    _RunOrResumeDebugee()
    {
	if (this.started)
	    GDBActions.ResumeDebugee();
	else
	    GDBActions.RunDebugee();
    }

    _BreakDebugee()
    {
	if (this.paused)
	    return;

	GDBActions.BreakDebugee();
    }

    _RestartDebugee()
    {
	this._BreakDebugee();

	this.started = false;
	this.paused = false;

	this._RunOrResumeDebugee();
    }

	render()
	{
		return (
		<div className="row" style={{"height":this.props.Height}}>
			<div className="col-sm-2">
			<div className="btn-group">
			<button className="btn btn-primary" onClick={this._RunOrResumeDebugee.bind(this)}>
				<span className="glyphicon glyphicon-play"></span>
			</button>
			<button className="btn btn-primary" onClick={this._BreakDebugee.bind(this)}>
				<span className="glyphicon glyphicon-pause"></span>
			</button>
			<button className="btn btn-primary" onClick={this._RestartDebugee.bind(this)}>
				<span className="glyphicon glyphicon-refresh"></span>
			</button>
			</div>
			</div>

			<div className="col-sm-9">
			<div className="btn-group">
			<button className="btn btn-primary" onClick={GDBActions.StepInto}>Step Into</button>
			<button className="btn btn-primary" onClick={GDBActions.StepOver}>Step Over</button>
			<button className="btn btn-primary" onClick={GDBActions.StepIntoInstruction}>Step Into Instruction</button>
			<button className="btn btn-primary" onClick={GDBActions.StepOverInstruction}>Step Over Instruction</button>
			</div>
			</div>
			<div className="col-sm-1">
			<div className="btn-group">
			<button className="btn btn-primary">
				<span className="glyphicon glyphicon-cog"></span>
			</button>
			</div>
			</div>
		</div>
		);
	}
}

export default ControlKeys;
