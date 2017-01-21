import React from 'react';
import GDBActions from './GDBActions';

class Breakpoint extends React.Component
{
	constructor(props)
        {
	    super(props);
	    this.state = {"enabled" :  props["enabled"],
			  "num" : props['num'],
			  "address" : props["address"],
			  "func" : props["func"],
			  "bp" : props["bp"]};
	}

        _EnableDisableBreakpoint()
        {
            if (this.state['enabled'])
		GDBActions.DisableBreakpoint(this.state['num']);
	    else
		GDBActions.EnableBreakpoint(this.state['num']);
        }

        _RemoveBreakpoint()
        {
	    GDBActions.RemoveBreakpoint(this.state['num']);
        }

	render()
        {
	let classname = "btn-danger";
	let icon = "glyphicon-remove";
	
	if (this.state['enabled'])
	{
	    classname = "btn-success";
	    icon = "glyphicon-ok";
	}

	    let enable_disable_button = (<button className={"btn " + classname} onClick={this._EnableDisableBreakpoint.bind(this)} style={{"width":"25px","height":"25px", "padding" : "0px 0px"}}>
				     <span className={"glyphicon " + icon} style={{"fontSize":"10px"}}></span>
				     </button>);

	    let remove_button = (<button className="btn btn-danger" onClick={this._RemoveBreakpoint.bind(this)} style={{"width":"25px","height":"25px", "padding" : "0px 0px"}}>
				     <span className="glyphicon glyphicon-remove" style={{"fontSize":"10px"}}></span>
				 </button>);
	    
	    return (
		<tr key={this.state['bp']}>
		<th scope="row">{this.state['num']}</th>
		<td>{this.state['address']}</td>
		<td>{this.state['func']}</td>
		    <td style={{"textAlign" : "center"}}>
		    
		    {enable_disable_button}
		</td>
		    <td style={{"textAlign" : "center"}}>
		    {remove_button}
		</td>
		</tr>
		);
	}
}

export default Breakpoint;
