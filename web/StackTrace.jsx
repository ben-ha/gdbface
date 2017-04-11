import React from 'react';
import GDBActions from './GDBActions.js';
import {RegisterDataStoreCallback} from './DataStore.js';
import {GetUIProxy} from './UIProxy.js';

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

    OnFrameClick(frame)
    {
	GDBActions.SelectStackFrame(frame.level);

	GetUIProxy().OpenSourceFile(frame.fullname, frame.file);
    }

    render() {
      	return (

	  <div>
	   <table className="table table-striped">
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
		    <td><button className="btn btn-link" onClick={this.OnFrameClick.bind(this, frame)}>{frame.addr}</button></td>
		    <td><button className="btn btn-link" onClick={this.OnFrameClick.bind(this, frame)}>{frame.func}</button></td>
		    <td><button className="btn btn-link" onClick={this.OnFrameClick.bind(this, frame)}>{frame.file + ":" + frame.line}</button></td>
		    </tr>
		    ) })
		}
		</tbody>
	   </table>
	 </div>
        );
     }
}

export default StackTrace;
