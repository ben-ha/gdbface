import React from 'react';
import ProgramConsole from './ProgramConsole.jsx';
import GDBConsole from './GDBConsole.jsx';
import Breakpoints from './Breakpoints.jsx';
import LocalVariables from './LocalVariables.jsx';
import StackTrace from './StackTrace.jsx';
import Watches from './Watches.jsx';
import CodeViewContainer from './CodeViewContainer.jsx';
import FileExplorer from './FileExplorer.jsx';
import HexView from './HexView.jsx';

class Dashboard extends React.Component {

    constructor(props)
    {
	super(props);
	this.codeview = null;
    }
    
      render() {
       return (
       	      <div className="panel panel-default">
	      <div className="panel-body">
	       <div id="mainarea" style={{"width":"70%", "float":"left", "minHeight":"80%", "height":"80%", "maxHeight" : "80%"}}>
	       <div id="dashboard_fileexplorer_div" style={{"overflow" : "auto", "width":"20%", "maxWidth":"20%", "float":"left"}}>
	       <FileExplorer />
	       </div>
	       <div id="dashboard_codeview_div" style={{"float":"left","width":"80%"}}>
	       <CodeViewContainer />
	       </div>
		</div>
		
	       <div id="secarea" style={{"width" : "30%", "height":"80%","float":"left", "overflow" : "auto"}}>
		     <Breakpoints />
		     <LocalVariables />
		     <Watches />
		     <StackTrace />
		</div>
	       <div id="bottomarea" style={{"clear": "both"}}>
	       <ul className="nav nav-tabs">
	       <li className="active"><a role="tab" data-toggle="tab" href="#programconsole">Program Console</a></li>
	       <li><a role="tab" data-toggle="tab" href="#gdbconsole">GDB Console</a></li>
	       <li><a role="tab" data-toggle="tab" href="#hexview">Memory View</a></li>
	       </ul>

	       <div className="tab-content">
	       <div id="programconsole" className="tab-pane active">
		<ProgramConsole />
		</div>
		<div id="gdbconsole" className="tab-pane">
		<GDBConsole />
		</div>
		<div id="hexview" className="tab-pane">
		<HexView ElementsInRow={16} />
		</div>
		</div>
		</div>
</div>
</div>
	);
      }
}

export default Dashboard;
