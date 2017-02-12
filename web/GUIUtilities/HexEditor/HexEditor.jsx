import React from 'react';
import HexRow from './HexEditorRow.jsx';
class HexEditor extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {content : props.Content};
	}

	render()
	{
		return (
		<div>
			<HexRow StartAddress={0} Content="ABCD" />		
		</div>

		);
	}
}

export default HexEditor;
