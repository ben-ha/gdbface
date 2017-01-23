import React from 'react';
import LocalVariable from './LocalVariable.jsx';
import GDBActions from './GDBActions.js';
import {RegisterDataStoreCallback} from './DataStore.js';

class LocalVariables extends React.Component {

      constructor(props)
      {
	  super(props);
	  RegisterDataStoreCallback(this._OnDataStoreChanged.bind(this));
	  this.state = {localvars : []};
	  this.require_update = true;
      }

      _OnDataStoreChanged(data)
      {
        if (data.ProgramState == "Stopped" && this.require_update)
	{
	   GDBActions.GetLocalVariables(); // trigger fresh query
	   this.require_update = false;
	}

	if (data.ProgramState == "Running")
	   this.require_update = true;
	   
	this.setState({localvars: data.LocalVariables});
      }

    render() {
      	return (

	  <div className="table table-striped">
	       <thead>
		<tr>
		  <th>Variable</th>
		  <th>Value</th>
		 </tr>
		</thead>
		<tbody>
		{
		    this.state.localvars.map(function (lv) { return (<LocalVariable key={lv.name + lv.value} varname={lv.name} value={lv.value} />) })
		}
		</tbody>
	 </div>
        );
     }
}

export default LocalVariables;
