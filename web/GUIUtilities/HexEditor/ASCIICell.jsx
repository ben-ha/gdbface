import React from 'react';
import EditableTextbox from '../EditableTextbox/EditableTextbox.jsx';

class ASCIICell extends React.Component
{
	constructor(props)
	{
		super(props);
		let should_color = props.OldContent != "" && props.OldContent != null && props.OldContent != undefined && props.OldContent != props.Content;
		this.color = should_color ? "red" : "black";
		this.state = {address: props.Address, content : props.Content};
	}

	_OnValueChange(val)
	{
		this.props.OnValueChanged(this.state.address, val.charCodeAt(0));
	}

	_MakePrintable(ch)
	{
		if (ch.match(/^[a-z0-9!"#$%&'()*+,.\/:;<=>?@\[\] ^_`{|}~-]*$/i) == null)
		   return ".";
		return ch;	
	}

	render()
	{
		return (
		<span style={{"float":"left", "marginRight" :"0px", "marginLeft":"0px"}}>
		<EditableTextbox Color={this.color} Size={1} MaxLength={1} Width="15px" onChange={this._OnValueChange.bind(this)} value={this._MakePrintable(this.state.content)} />		
		</span>
);
	}
}

export default ASCIICell;
