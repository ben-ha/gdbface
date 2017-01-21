import React from 'react';
import {RegisterDataStoreCallback} from './DataStore.js';

class PlainConsole extends React.Component
{
    constructor(props)
    {
	super(props);
	RegisterDataStoreCallback(this._OnGDBData.bind(this));
	this.store_member = props.Output;
	this.state = {output : ""};
    }

    _OnGDBData(store)
    {
	this.setState({output : store[this.store_member]});
    }

    render()
    {
	   return (
		<div>
		   <textarea className="form-control" rows="3" id="console_gdboutput" value={this.state.output} readOnly/>
		</div>
		    );
	}
}

export default PlainConsole;
