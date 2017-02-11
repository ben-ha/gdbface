import React from 'react';
import HexCell from './HexCell.jsx';
import ASCIICell from './ASCIICell.jsx';

class HexRow extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {start : props.StartAddress, Content : props.Content};
	}

	render()
	{
		return (
		<div>

		</div>
		);
	}
}

export Default HexRow;