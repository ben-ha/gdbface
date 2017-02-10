import React from 'react';
import GDBActions from './GDBActions';
import {RegisterDataStoreCallback, UnregisterDataStoreCallback} from './DataStore.js';
import EditableTextbox from './GUIUtilities/EditableTextbox/EditableTextbox.jsx';

class Watch extends React.Component
{
	constructor(props)
        {
	    super(props);
	    this.onChanged = props.onChanged;
	    this.state = {id: props.ID, expression:props.expression, value:props.value};
	    this.require_update = true;
	    this.OnExpressionChangeCallback = props.onExpressionChange;
	    this._store_callback = this._OnDataStoreChanged.bind(this);
	    RegisterDataStoreCallback(this._store_callback);    
	}
	
	componentWillUnmount()
	{
		UnregisterDataStoreCallback(this._store_callback);
	}

	_OnDataStoreChanged(data)
	{
		if (this.state.expression == "" || this.state.expression == undefined)
		   return;
		   
		if (this.require_update && data.ProgramState == "Stopped")
		{
			GDBActions.EvaluateExpression(this.state.id, this.state.expression);
			this.require_update = false;
		}

		if (data.ProgramState == "Running")
		   this.require_update = true;
		
		if (data.Watches[this.state.id] == undefined)
		   return;

		this.setState({value:data.Watches[this.state.id]});
	}

	_OnValueChange(val)
	{ 
		this.setState({expression : val});

		GDBActions.EvaluateExpression(this.state.id.toString(), val);
		this.OnExpressionChangeCallback(this.state.id, val);
	}

	render()
        {
	    return (
		<tr key={this.state['id']}>
		<td><EditableTextbox value={this.state["expression"]} onChange={this._OnValueChange.bind(this)} /></td>
		<td>{this.state['value']}</td>
		</tr>
		);
	}
}

export default Watch;
