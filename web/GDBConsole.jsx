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

    _OnChange(e)
    {
	this.setState({input:e.target.value});
    }
    
    _OnNewLine(line)
    {
	GDBActions.SendGDBConsoleInput(line);
    }

    _OnKeyDown(event)
    {
      if (event.keyCode == 13)
      {
         this._OnNewLine(this.state.input);
	 this.setState({input:""});
      }
    }

    render()
    {
	   return (
		<div className="form-group">
		    <PlainConsole Output="GDBConsoleOutput" />
		    <input id="GDBConsoleInputLine" className="form-control" type="text" value={this.state.input} onChange={this._OnChange.bind(this)} onKeyDown={this._OnKeyDown.bind(this)}/>
		    </div>
		    );
	}
}

export default GDBConsole;
