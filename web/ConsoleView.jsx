import React from 'react';

class ConsoleView extends React.Component
{
	render()
	{
	   return (
		<div className="form-group">
		    <textarea className="form-control" rows="3" id="console_gdboutput" readOnly/>
		    <label for="console_input">GDB:</label>
		    <input type="text" className="form-control" id="console_input" />
		    </div>
		    );
	}
}

export default ConsoleView;