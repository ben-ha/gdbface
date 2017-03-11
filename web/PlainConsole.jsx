import React from 'react';
import {RegisterDataStoreCallback} from './DataStore.js';

class PlainConsole extends React.Component
{
    constructor(props)
    {
	super(props);
	this.store_member = props.Output;
	this.state = {output : ""};
    }

    componentDidMount()
    {
	RegisterDataStoreCallback(this._OnGDBData.bind(this));
    }

    _OnGDBData(store)
    {
	this.setState({output : store[this.store_member]});
    }

    componentDidUpdate(prevProps, prevState)
    {
	let text_area = document.getElementById("console_" + this.store_member);

	text_area.scrollTop = text_area.scrollHeight;
    }

    render()
    {
	   return (
		<div>
		   <textarea className="form-control" rows="3" id={"console_" + this.store_member} value={this.state.output} readOnly/>
		</div>
		    );
	}
}

export default PlainConsole;
