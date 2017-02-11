import React from 'react';

class EditableTextbox extends React.Component
{

	constructor(props)
	{
		super(props);
		this.OnChangeCallback = props.onChange;
		// Add LengthLimit for hexeditor support
		this.MaxLength = props.MaxLength;
		this.AllowedCharsRegex = props.AllowedCharsRegex;
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

		if (this.AllowedCharsRegex != undefined && this.state.value.match(new RegExp(this.AllowedCharsRegex)) == null)
		{
			// Violated regex, rollback

			this.setState({value : oldval});
			return;
		}
		
		this.OnChangeCallback(this.state.value);
	}

	render()
	{
		return (
		<div>
		<input type="text" value={this.state.value} style={{"border":"0px", "backgroundColor" : "transparent"}} onChange={this._OnChange.bind(this)} onBlur={this._OnBlur.bind(this)} onFocus={this._OnFocus.bind(this)} maxlength={this.maxlength}/>
		</div>
		);
	}

}

export default EditableTextbox;
