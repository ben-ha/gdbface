import React from 'react';
import EditableTextbox from '../EditableTextbox/EditableTextbox.jsx';

class HexCell extends React.Component
{
	constructor(props)
	{
		super(props);
		let should_color = props.OldContent != "" && props.OldContent != null && props.OldContent != undefined && props.OldContent != props.Content;
		this.OnValueChanged = props.OnValueChanged;
		this.color = should_color ? "red" : "black";
		this.state = {address: props.Address, content : this._MakeZeroPaddedHexString(props.Content)};
	}

	_OnValueChange(val)
	{
		this.OnValueChanged(this.state.address, parseInt(val, 16));
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
		<span key={this.state.address} style={{"float":"left", "marginRight" : "0px", "marginLeft" :"0px"}}>
		<EditableTextbox Color={this.color} Size={1} MaxLength={2} Width="20px" AllowedCharsRegex="[0-9A-Fa-f][0-9A-Fa-f]" onChange={this._OnValueChange.bind(this)} value={this.state.content} />		
		</span>
);
	}
}

export default HexCell;
