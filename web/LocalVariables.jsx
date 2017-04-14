import React from 'react';
import LocalVariable from './LocalVariable.jsx';
import GDBActions from './GDBActions.js';
import {RegisterDataStoreCallback} from './DataStore.js';
import {RegisterUIProxyCallback} from './UIProxy.js';
import {GetUIProxy} from './UIProxy.js';
import {uiproxyevents} from '../API.js';

class LocalVariables extends React.Component {

      constructor(props)
      {
	  super(props);
	  RegisterDataStoreCallback(this._OnDataStoreChanged.bind(this));
	  RegisterUIProxyCallback(uiproxyevents.ON_INVALIDATE_MEMORY, this._OnInvalidateMemory.bind(this));
	  this.state = {localvars : []};
	  this.require_update = true;
      }

      _OnInvalidateMemory()
      {
	GDBActions.GetLocalVariables();
      }

      _OnDataStoreChanged(data)
      {
        if (data.ProgramState == "Stopped" && this.require_update)
	{
	   GetUIProxy().InvalidateMemory(); // trigger fresh query - kind of ugly because why LocalVariables is responsible for invalidating all?
	   this.require_update = false;
	}

	if (data.ProgramState == "Running")
	   this.require_update = true;
	   
	this.setState({localvars: data.LocalVariables});
      }

      _OnVariableChanged(name, value)
      {
	this.require_update = true;
	GDBActions.GetLocalVariables();
      }

    render() {
      	return (

	    <div className="panel panel-info">
		<div className="panel-heading">Local variables</div>
		<div className="panel-body">
	    <table className="table table-striped">
	       <thead>
		<tr>
		  <th>Variable</th>
		  <th>Value</th>
		 </tr>
		</thead>
		<tbody>
		{
		    this.state.localvars.map((lv) => { return (<LocalVariable key={lv.name + lv.value} varname={lv.name} value={lv.value} onChanged={this._OnVariableChanged.bind(this)} />) })
		}
		</tbody>
	    </table>
	    </div>
	</div>
        );
     }
}

export default LocalVariables;
