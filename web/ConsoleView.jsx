import React from 'react';
import GDBConsole from './GDBConsole.jsx';
import ProgramConsole from './ProgramConsole.jsx';
class ConsoleView extends React.Component
{
	render()
	{
	    return (
		<div>
		   <ul className="nav nav-tabs">
		   <li className="active"><a role="tab" data-toggle="tab" href="#gdbconsole">GDB Console</a></li>
		   <li><a role="tab" data-toggle="tab" href="#programconsole">Program Console</a></li>
		   </ul>

	           <div className="tab-content">
		   <div id="programconsole" className="tab-pane active">
		   <ProgramConsole />
		   </div>
		    </div>
		    </div>
	   );
	}
}

export default ConsoleView;
