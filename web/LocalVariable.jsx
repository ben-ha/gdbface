import React from 'react';
import GDBActions from './GDBActions';

class LocalVariable extends React.Component
{
	constructor(props)
        {
	    super(props);
	    this.state = {varname:props.varname, value:props.value};
	}

	render()
        {   
	    return (
		<tr key={this.state['varname']}>
		<td>{this.state['varname']}</td>
		<td>{this.state['value']}</td>
		</tr>
		);
	}
}

export default LocalVariable;
