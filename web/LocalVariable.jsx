import React from 'react';
import GDBActions from './GDBActions';
import EditableTextbox from './GUIUtilities/EditableTextbox/EditableTextbox.jsx';

class LocalVariable extends React.Component
{
	constructor(props)
        {
	    super(props);
	    this.onChanged = props.onChanged;
	    this.state = {varname:props.varname, value:props.value};
	}

	_OnValueChange(val)
	{
		if (this.state.value == val)
		   return;
		   
		this.setState({value : val});

		GDBActions.SetVariable(this.state.varname, val);
	}

	render()
        {   
	    return (
		<tr key={this.state['varname']}>
		<td>{this.state['varname']}</td>
		<td><EditableTextbox value={this.state['value']} onChange={this._OnValueChange.bind(this)} /></td>
		</tr>
		);
	}
}

export default LocalVariable;
