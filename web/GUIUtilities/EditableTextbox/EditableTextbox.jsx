import React from 'react';

class EditableTextbox extends React.Component
{

	constructor(props)
	{
		super(props);
		this.OnChangeCallback = props.onChange;
		// Add LengthLimit for hexeditor support
		this.maxlength = props.MaxLength;
		this.AllowedCharsRegex = props.AllowedCharsRegex;
		this.size = props.Size;
		this.border = props.WithBorder ? "" : "0px";
		this.borderClass = props.WithBorder ? "form-control" : "";
		this.width = props.Width;
		this.state = {value: props.value, color : props.Color};
	        this.oldval = this.state.value;
	        this.enterForcesUpdate = props.updateOnEnter;
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
	    this._ChangeValue(false);
	}

        _ChangeValue(notify_if_same)
        {
		if (!notify_if_same && (this.oldval == this.state.value))
		   return;

		if (this.AllowedCharsRegex != undefined && this.state.value.match(new RegExp(this.AllowedCharsRegex)) == null)
		{
			// Violated regex, rollback

			this.setState({value : oldval});
			return;
		}
		
		this.OnChangeCallback(this.state.value);
        }
    
        _OnKeyDown(e)
        {
	    if (this.enterForcesUpdate && e.keyCode == 13)
		this._ChangeValue(true);
	}

	render()
	{
		return (
		<div>
		<input type="text" className={this.borderClass} value={this.state.value} style={{"fontFamily" : "monospace", "width" : this.width, "border":this.border, "backgroundColor" : "transparent", "color" : this.state.color}} onKeyDown={this._OnKeyDown.bind(this)} onChange={this._OnChange.bind(this)} onBlur={this._OnBlur.bind(this)} onFocus={this._OnFocus.bind(this)} maxLength={this.maxlength} size={this.size}/>
		</div>
		);
	}

}

export default EditableTextbox;
