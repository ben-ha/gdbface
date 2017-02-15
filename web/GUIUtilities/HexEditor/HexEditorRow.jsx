import React from 'react';
import HexCell from './HexCell.jsx';
import ASCIICell from './ASCIICell.jsx';

class HexRow extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {start : props.StartAddress, content : props.Content, oldcontent : props.OldContent};
	}

	render()
	{

		var hex_cells = []
		var ascii_cells = []
		for (let i = 0; i < this.state.content.length; ++i)
		{
			hex_cells.push((
			    <HexCell Address={this.state.start + i} Content={this.state.content[i]} OldContent={this.state.oldcontent[i]} />)
		)
		}

		for (let i = 0; i < this.state.content.length; ++i)
		{
			ascii_cells.push((
			    <ASCIICell Address={this.state.start + i} Content={this.state.content[i]} OldContent={this.state.oldcontent[i]} />)
		)
		}

		return (
		<div>
		<span style={{float:"left"}}>
		{this.state.start.toString(16) + ":"}
		</span>
		<span style={{float:"left", marginLeft:"20px"}}>
		{hex_cells}
		</span>
		<span style={{float:"left", marginLeft:"20px"}}>
		{ascii_cells}
		</span>
		<span style={{clear:"both"}} />
		</div>
		);
	}
}

export default HexRow;
