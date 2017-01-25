import React from 'react';
import GDBActions from './GDBActions.js';
import {RegisterDataStoreCallback} from './DataStore.js';

class StackTrace extends React.Component {

      constructor(props)
      {
	  super(props);
	  RegisterDataStoreCallback(this._OnDataStoreChanged.bind(this));
	  this.require_update = true;
	  this.state = {StackTrace : []};
      }

      _OnDataStoreChanged(data)
      {
        if (data.ProgramState == "Stopped" && this.require_update)
	{
		GDBActions.GetStackTrace();
		this.require_update = false;
	}

	if (data.ProgramState == "Running")
	   this.require_update = true;
	   
	this.setState({StackTrace : data.StackTrace});
      }

    render() {
      	return (

	  <div className="table table-striped">
	       <thead>
		<tr>
		  <th>Address</th>
		  <th>Function</th>
		  <th>Source</th>
		 </tr>
		</thead>
		<tbody>
		{
		    this.state.StackTrace.map((frame) => { return (
		    <tr key={frame.level}>
		    <td>{frame.addr}</td>
		    <td>{frame.func}</td>
		    <td>{frame.file + ":" + frame.line}</td>
		    </tr>
		    ) })
		}
		</tbody>
	 </div>
        );
     }
}

export default StackTrace;
