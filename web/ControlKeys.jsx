import React from 'react';
import GDBActions from './GDBActions.js';

class ControlKeys extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {paused : false, started : false};
	}

	OnGDBMessage(msg)
	{
		if (msg.Data == undefined || msg.Data == null)
		   return;

		if (this.state.started == false)
		{
			if (msg.Data.running != undefined)
			   this.setState({started : true});	   
		}
		
		let should_change = (msg.Data.running != undefined) || (msg.Data.stopped != undefined);

		if (should_change)
			this.setState({paused : msg.Data.stopped != undefined});
	}

        _RunOrResumeDebugee()
	{
		if (this.state.started)
		   GDBActions.ResumeDebugee();
		else
		   GDBActions.RunDebugee();
	}

	_BreakDebugee()
	{
		if (this.state.paused)
		   return;

		GDBActions.BreakDebugee();
	}

	_RestartDebugee()
	{
		this._BreakDebugee();

		this.setState({started : false, paused : false});

		this._RunOrResumeDebugee();
	}

	render()
	{
		return (
		<div className="row">
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
			<button className="btn btn-primary" onClick={GDBActions.StepInstruction}>Step Instruction</button>
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
