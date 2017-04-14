import React from 'react';
import Watch from './Watch.jsx';
import GDBActions from './GDBActions.js';
import {RegisterDataStoreCallback} from './DataStore.js';

class Watches extends React.Component {

      constructor(props)
      {
	  super(props);
	  RegisterDataStoreCallback(this._OnDataStoreChanged.bind(this));
	  this.state = {watches : {} };
	  this.expressions = {};
      }

      _OnDataStoreChanged(data)
      {
	this.setState({watches : data.Watches});
      }

      _OnExpressionChange(id, expr)
      {
	this.expressions[id] = expr;
      }

    render() {
      	return (

	    <div className="panel panel-info">
		<div className="panel-heading">Watches</div>
		<div className="panel-body">
	   <table className="table table-striped">
	       <thead>
		<tr>
		  <th>Expression</th>
		  <th>Value</th>
		 </tr>
		</thead>
		<tbody>
		{
		    Object.keys(this.state.watches).map((wid) => { return (<Watch key={wid} ID={ wid.toString()} expression={this.expressions[wid]} value={this.state.watches[wid].value} onExpressionChange={this._OnExpressionChange.bind(this)} />) })
		}
		<Watch key={Object.keys(this.state.watches).length} ID={Object.keys(this.state.watches).length} onExpressionChange={this._OnExpressionChange.bind(this)}/>
		</tbody>
           </table>
	   </div>
	 </div>
        );
     }
}

export default Watches;
