import React from 'react';
import HexEditor from './GUIUtilities/HexEditor/HexEditor.jsx';
import EditableTextbox from './GUIUtilities/EditableTextbox/EditableTextbox.jsx';
import GDBActions from './GDBActions.js';
import {RegisterDataStoreCallback} from './DataStore.js';

const DEFAULT_MEMORY_CHUNK_SIZE = 64

class HexView extends React.Component
{
	constructor(props)
	{
		super(props);
		this.elements_in_row = props.ElementsInRow;
		this.state = {content : "", old_content : "", start_address : null};
	}

	componentDidMount()
	{
		RegisterDataStoreCallback(this._OnDataStoreChanged.bind(this));
	}

	_OnDataStoreChanged(store)
	{
		let old_start_address = this.state.start_address;
		let old_content = "";
		if (old_start_address == store.HexView.Address)
		   old_content = this.state.content;
		
		this.setState({start_address : store.HexView.Address, content : store.HexView.Memory, old_content : old_content});
		
	}

	_OnChangeAddress(val)
	{
		GDBActions.GetMemoryChunk(val, DEFAULT_MEMORY_CHUNK_SIZE);
	}

	_OnValueChanged(address, val)
	{
		GDBActions.SetMemoryChunk(address, String.fromCharCode(val));
	}

	_RefreshView()
	{
		GDBActions.GetMemoryChunk(this.state.start_address, DEFAULT_MEMORY_CHUNK_SIZE);
	}
	
	render()
	{
		let editor = undefined;
		if (this.state.start_address != null && this.state.content != "")
			editor = (<HexEditor Content={this.state.content} OldContent={this.state.old_content} StartAddress={this.state.start_address} ElementsInRow={this.elements_in_row} OnValueChanged={this._OnValueChanged.bind(this)}/>);
 
		return (
		      <div>
		      <EditableTextbox WithBorder={true} onChange={this._OnChangeAddress.bind(this)} />
		      {editor}
		      </div>
		)
	}
}

export default HexView;
