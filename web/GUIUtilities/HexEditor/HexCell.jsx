import React from 'react';
import EditableTextbox from '../EditableTextbox/EditableTextbox.jsx';

class HexCell extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {address: props.Address, content : this._MakeZeroPaddedHexString(props.Content)};
	}

	_OnValueChange(val)
	{
		this.props.OnValueChanged(address, parseInt(val, 16));
	}

	_MakeZeroPaddedHexString(str)
	{
		let val = str.charCodeAt(0);
		val = val.toString(16);

		if (val.length == 1)
		   return "0" + val;

		return val;
	}

	render()
	{
		return (
		<div>
		<EditableTextbox MaxLength={2} AllowedCharsRegex="[0-9A-Fa-f][0-9A-Fa-f]" onChange={this._OnValueChange.bind(this)} value={this.state.content} />;		
		</div>
);
	}
}

export default HexCell;
