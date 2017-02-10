import React from 'react';
import Watch from './Watch.jsx';
import GDBActions from './GDBActions.js';
import {RegisterDataStoreCallback} from './DataStore.js';

class Watches extends React.Component {

      constructor(props)
      {
	  super(props);
	  RegisterDataStoreCallback(this._OnDataStoreChanged.bind(this));
	  this.state = {watches : {}, current_wid : 0};
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

	  <div className="table table-striped">
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
		<Watch key={"777777" + Object.keys(this.state.watches).length} ID={"777777" + Object.keys(this.state.watches).length} onExpressionChange={this._OnExpressionChange.bind(this)}/>
		</tbody>
	 </div>
        );
     }
}

export default Watches;
