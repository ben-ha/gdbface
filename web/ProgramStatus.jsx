import React from 'react';
import {RegisterDataStoreCallback} from './DataStore.js';

class ProgramStatus extends React.Component {

    constructor(props)
    {
	super(props);
    }

    componentDidMount()
    {
	RegisterDataStoreCallback(this._OnDataStoreChanged.bind(this));
    }

    _OnDataStoreChanged(store)
    {
	this.setState({status : store.ProgramState});
    }
    
    _GetStatusNode()
    {
	if (this.state == null || this.state.status == undefined)
	    return;
	
	let alert_style = "";
	let alert_msg = "";
	
	switch(this.state.status)
	{
	    case "NotStarted":
	    alert_style = "alert-info";
	    alert_msg = "Not started";
	    break;
	    case "Running":
	    alert_style = "alert-success";
	    alert_msg = "Running";
	    break;
	    case "Stopped":
	    alert_style = "alert-warning";
	    alert_msg = "Paused";
	    break;
	    case "Terminated":
	    alert_style = "alert-danger";
	    alert_msg = "Terminated";
	}

	return (<div className={"alert " + alert_style} style={{padding: "1px", "display" : "inline-block"}}>{alert_msg}</div>);
    }
    
    render() {
      	return (
		<div>
	    {this._GetStatusNode()}
		</div>
	    );
}
}

export default ProgramStatus;
