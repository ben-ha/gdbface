import React from 'react';
import {RegisterDataStoreCallback} from './DataStore.js';
import PlainConsole from './PlainConsole.jsx';
import GDBActions from './GDBActions.js';
 
class GDBConsole extends React.Component
{
    constructor(props)
    {
	super(props);
	this.state = {input:""};
    }
    
    _OnNewLine(line)
    {
	GDBActions.SendGDBConsoleInput(line);
    }

    render()
    {
	   return (
		<div>
		    <PlainConsole Output="GDBConsoleOutput" OnNewLine={this._OnNewLine.bind(this)} Echo={true} Prompt="(gdb)" MaxLength={1024} />
		</div>
		    );
	}
}

export default GDBConsole;
