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
	    <div className="row" style={{"height":this.props.Height}}>
		<div className="col-sm-2">
		    <span className="alert alert-info" style={{padding: "1px", marginRight: "5px"}}>Program status:</span>
		    <ProgramStatus />
		</div>
		<div className="col-sm-1"> 
		    <span className="alert alert-info" style={{padding: "1px", marginRight: "5px"}}>PID:</span>
		    <span className="alert alert-info" style={{padding: "1px"}}>
			{(this.state.pid != -1 ? this.state.pid : "N/A")}
			</span>
		</div>
	    </div>
	    );
}
}

export default StatusBar;
