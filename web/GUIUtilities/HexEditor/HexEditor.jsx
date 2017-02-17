import React from 'react';
import HexRow from './HexEditorRow.jsx';
class HexEditor extends React.Component
{
	constructor(props)
	{
		super(props);
		let content = (props.Content != undefined) ? props.Content : "";
		let old_content = (props.OldContent != undefined) ? props.OldContent : "";
		this.state = {content : content, old_content: old_content, row_elements : props.ElementsInRow, start_address : props.StartAddress};
	}

	_OnValueChanged(address, val)
	{
		console.log("CALLED1");
		if (this.props.OnValueChanged != null && this.props.OnValueChanged != undefined)
			this.props.OnValueChanged(address, val);
	}

	render()
	{
		let rows = [];

		let address = this.state.start_address;
		for (let i = 0; i < this.state.content.length / this.state.row_elements; ++i)
		{
			rows.push((<HexRow StartAddress={address} Content={this.state.content.substr(i*this.state.row_elements, this.state.row_elements)} OldContent={this.state.old_content.substr(i*this.state.row_elements, this.state.row_elements)} OnValueChanged={this._OnValueChanged.bind(this)} />))

			address += this.state.row_elements;
		}

		if (this.state.content.length % this.state.row_elements != 0)
		{ // Push one last row
		  let index = Math.floor(this.state.content.length / this.state.row_elements);
		  
		  rows.push((<HexRow StartAddress={address} Content={this.state.content.substr(index, this.state.row_elements)} OldContent={this.state.old_content.substr(index, this.state.row_elements)} OnValueChanged={this._OnValueChanged.bind(this)} />))
		}
		
		return (
		<div>
			{rows}
		</div>

		);
	}
}

export default HexEditor;
