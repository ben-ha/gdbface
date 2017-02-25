import React from 'react';
import HexCell from './HexCell.jsx';
import ASCIICell from './ASCIICell.jsx';
import Utilities from '../Utilities.js';

class HexRow extends React.Component
{
	constructor(props)
	{
		super(props);
		this.OnValueChanged = props.OnValueChanged;
		this.state = {start : props.StartAddress, content : props.Content, oldcontent : props.OldContent};
	}

	_OnValueChanged(address, val)
	{
		if (this.OnValueChanged != null && this.OnValueChanged != undefined)
			this.OnValueChanged(address, val);
	}

	render()
	{

		var hex_cells = []
		var ascii_cells = []
		for (let i = 0; i < this.state.content.length; ++i)
		{
			hex_cells.push((
			    <HexCell key={this.state.start + i} Address={this.state.start + i} Content={this.state.content[i]} OldContent={this.state.oldcontent[i]} OnValueChanged={this._OnValueChanged.bind(this)} />)
		)
		}

		for (let i = 0; i < this.state.content.length; ++i)
		{
			ascii_cells.push((
			    <ASCIICell key={2*(this.state.start + i)} Address={this.state.start + i} Content={this.state.content[i]} OldContent={this.state.oldcontent[i]} OnValueChanged={this._OnValueChanged.bind(this)} />)
		)
		}

		return (
		<div style={{"clear": "both"}}>
		<span style={{"fontFamily" : "monospace", float:"left"}}>
		{Utilities.NumberToAddress(this.state.start) + ":"}
		</span>
		<span style={{float:"left", marginLeft:"20px"}}>
		{hex_cells}
		</span>
		<span style={{float:"left", marginLeft:"20px"}}>
		{ascii_cells}
		</span>
		</div>
		);
	}
}

export default HexRow;
