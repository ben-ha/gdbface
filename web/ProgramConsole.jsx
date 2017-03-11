import React from 'react';
import {RegisterDataStoreCallback} from './DataStore.js';
import PlainConsole from './PlainConsole.jsx';
import GDBActions from './GDBActions.js';
 
class ProgramConsole extends React.Component
{
    constructor(props)
    {
	super(props);
	this.state = {input:""};
    }
    
    _OnNewLine(line)
    {
	GDBActions.SendConsoleInput(line + "\n");
    }

    render()
    {
	   return (
		<div className="form-group">
		    <PlainConsole Output="ProgramConsoleOutput" OnNewLine={this._OnNewLine.bind(this)} MaxLength={1024} />
		</div>
		    );
	}
}

export default ProgramConsole;
