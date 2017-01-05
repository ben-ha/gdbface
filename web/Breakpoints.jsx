import React from 'react';

class Breakpoints extends React.Component {

      constructor(props)
      {
	super(props);
	this.state = {"breakpoints": []};
      }

      OnGDBInfoReceived(info)
      {
	//TODO: Add breakpoints
      }

      AddBreakpoint(bpt)
      {
	this.state["breakpoints"].push(bpt);	
      }

      render() {
      	return (

	  <div className="table">
	       <thead>
		<tr>
		  <th>ID</th>
		  <th>Address</th>
		  <th>Function</th>
		  <th>Enabled</th>
		 </tr>
		</thead>
		<tbody>
		
		</tbody>
	 </div>
        );
     }
}

export default Breakpoints;