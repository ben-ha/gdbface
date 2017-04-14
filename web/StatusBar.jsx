import React from 'react';
import ProgramStatus from './ProgramStatus.jsx';
import {RegisterDataStoreCallback} from './DataStore.js';

class StatusBar extends React.Component {
    constructor(props)
    {
	super(props);
	this.state = {pid : -1};
    }

    componentDidMount()
    {
	RegisterDataStoreCallback(this._OnGDBData.bind(this));
    }

    _OnGDBData(store)
    {
	this.setState({pid : store.PID}) 
    }

    render() {
      	return (
	    <div className="row">
		<div className="col-sm-1">
		    <ProgramStatus />
		</div>
		<div className="col-sm-4"> 
		    <div className="alert alert-info" style={{padding: "1px", display : "inline-block"}}>
			{"PID: " + (this.state.pid != -1 ? this.state.pid : "N/A")}
			</div>
		</div>
	    </div>
	    );
}
}

export default StatusBar;
