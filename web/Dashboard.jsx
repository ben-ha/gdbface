import React from 'react';
import ProgramConsole from './ProgramConsole.jsx';
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
	       <div id="mainarea" style={{"width":"70%", "float":"left", "minHeight":"80%", "height":"80%"}}>
	       <div id="dashboard_fileexplorer_div" style={{"width":"10%", "float":"left"}}>
	       <FileExplorer />
	       </div>
	       <div id="dashboard_codeview_div" style={{"float":"left","width":"90%"}}>
	       <CodeViewContainer />
	       </div>
		</div>
		
	       <div id="secarea" style={{"height":"80%","float":"right", "overflow" : "hidden"}}>
		     <Breakpoints />
		     <LocalVariables />
		     <Watches />
		     <StackTrace />
		</div>
	       <div id="bottomarea" style={{"clear": "both"}}>
	       <ul className="nav nav-tabs">
	       <li className="active"><a role="tab" data-toggle="tab" href="#programconsole">Program Console</a></li>
	       <li><a role="tab" data-toggle="tab" href="#hexview">Memory View</a></li>
	       </ul>

	       <div className="tab-content">
	       <div id="programconsole" className="tab-pane active">
		<ProgramConsole />
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
