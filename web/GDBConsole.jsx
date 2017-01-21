import React from 'react';
import {RegisterDataStoreCallback} from './DataStore.js';
import PlainConsole from './PlainConsole.jsx';

class GDBConsole extends React.Component
{
    constructor(props)
    {
	super(props);
    }

    render()
    {
	   return (
		<div className="form-group">
		    <PlainConsole Output="ProgramConsoleOutput" />
		    <label for="console_input">GDB:</label>
		    <input type="text" className="form-control" id="console_input" />
		    </div>
		    );
	}
}

export default GDBConsole;
