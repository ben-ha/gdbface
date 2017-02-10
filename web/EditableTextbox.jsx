import React from 'react';

class EditableTextbox extends React.Component
{

	constructor(props)
	{
		super(props);
		this.OnChangeCallback = props.onChange;
		this.state = {value: props.value};
		this.oldval = this.state.value;
	}

	_OnFocus()
	{
		this.oldval = this.state.value;
	}
	
	_OnChange(event)
	{
		if (this.state.value == event.target.value)
		   return;
		   
		this.setState({value : event.target.value});
	}

	_OnBlur()
	{
		if (this.oldval == this.state.value)
		   return;
		   
		this.OnChangeCallback(this.state.value);
	}

	render()
	{
		return (
		<div>
		<input type="text" value={this.state.value} style={{"border":"0px", "backgroundColor" : "transparent"}} onChange={this._OnChange.bind(this)} onBlur={this._OnBlur.bind(this)} onFocus={this._OnFocus.bind(this)} />
		</div>
		);
	}

}

export default EditableTextbox;
