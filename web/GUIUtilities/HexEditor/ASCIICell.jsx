import React from 'react';
import EditableTextbox from '../EditableTextbox/EditableTextbox.jsx';

class ASCIICell extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {address: props.Address, content : props.Content};
	}

	_OnValueChange(val)
	{
		this.props.OnValueChanged(address, val.charCodeAt(0));
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
		<div>
		<EditableTextbox MaxLength={1} onChange={this._OnValueChange.bind(this)} value={this._MakePrintable(this.state.content)} />;		
		</div>
);
	}
}

export default ASCIICell;
