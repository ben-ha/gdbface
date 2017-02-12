import React from 'react';
import HexCell from './HexCell.jsx';
import ASCIICell from './ASCIICell.jsx';

class HexRow extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {start : props.StartAddress, content : props.Content};
	}

	render()
	{

		var hex_cells = [];
		var ascii_cells = [];
		for (let i = 0; i < this.state.content.length; ++i)
		{
			hex_cells.push((
			<td>
			    <HexCell Address={this.state.start + i} Content={this.state.content[i]} />
			</td>)
		)
		}

		for (let i = 0; i < this.state.content.length; ++i)
		{
			ascii_cells.push((
			<td>
			    <ASCIICell Address={this.state.start + i} Content={this.state.content[i]} />
			</td>)
		)
		}

		return (
		<tr>
		<td>{this.state.start.toString(16)}</td>
		{hex_cells}
		{ascii_cells}
		</tr>
		);
	}
}

export default HexRow;
