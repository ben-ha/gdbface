import React from 'react';
import {RegisterDataStoreCallback} from './DataStore.js';
import PlainConsole from './PlainConsole.jsx';

class ProgramConsole extends React.Component
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
		    </div>
		    );
	}
}

export default ProgramConsole;
