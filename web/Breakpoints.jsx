import React from 'react';
import Breakpoint from './Breakpoint.jsx';
import {RegisterDataStoreCallback} from './DataStore.js';

class Breakpoints extends React.Component {

      constructor(props)
      {
	  super(props);
	  RegisterDataStoreCallback(this._OnDataStoreChanged.bind(this));
	  this.state = {breakpoints : []};
      }

      _OnDataStoreChanged(data)
    {
	this.setState({breakpoints: data.Breakpoints});
      }

    render() {
      	return (

	  <div> 
	    <table className="table table-striped">
	       <thead>
		<tr>
		  <th>#</th>
		  <th>Address</th>
		  <th>Function</th>
		<th>Active</th>
		<th>Remove</th>
		 </tr>
		</thead>
		<tbody>
		{
		    this.state.breakpoints.map(function (bp) { return (<Breakpoint key={bp.number+bp.addr+bp.func+bp.file+bp.line+bp.enabled} num={bp.number} address={bp.addr} func={bp.func + "@" + bp.file +":" +bp.line} enabled={bp.enabled == "y"} />) })
		}
		</tbody>
	    </table>
	 </div>
        );
     }
}

export default Breakpoints;
