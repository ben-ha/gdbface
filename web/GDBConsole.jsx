import React from 'react';
import {RegisterDataStoreCallback} from './DataStore.js';

class GDBConsole extends React.Component
{
    constructor(props)
    {
	super(props);
	RegisterDataStoreCallback(this._OnGDBData.bind(this));
	this.state = {output : ""};
    }

    _OnGDBData(store)
    {
	this.setState({output : store.ProgramConsoleOutput});
    }

    render()
    {
	   return (
		<div className="form-group">
		   <textarea className="form-control" rows="3" id="console_gdboutput" value={this.state.output} readOnly/>
		    <label for="console_input">GDB:</label>
		    <input type="text" className="form-control" id="console_input" />
		    </div>
		    );
	}
}

export default GDBConsole;
