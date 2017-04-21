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

const MAIN_AREA_HEIGHT = "70%";
const BOTTOM_AREA_HEIGHT = "30%";

class Dashboard extends React.Component {

    constructor(props)
    {
	super(props);
	this.codeview = null;
    }
    
      render() {
	  return (
	      <div style={{"height" : this.props.Height}}>
	       <div id="mainarea" style={{"width":"70%", "float":"left", "height" : MAIN_AREA_HEIGHT}}>
	       <div id="dashboard_fileexplorer_div" style={{"overflow" : "auto", "width":"20%", "maxWidth":"20%", "float":"left"}}>
	       <FileExplorer />
	       </div>
	       <div id="dashboard_codeview_div" style={{"float":"left","width":"80%", "height":"100%"}}>
	       <CodeViewContainer />
	       </div>
		</div>
		
	       <div id="secarea" style={{"width" : "30%", "height": MAIN_AREA_HEIGHT,"float":"left", "overflow" : "auto"}}>
		     <Breakpoints />
		     <LocalVariables />
		     <Watches />
		     <StackTrace />
		</div>
	       <div id="bottomarea" style={{"clear": "both", "height":BOTTOM_AREA_HEIGHT}}>
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
	  );
      }
}

export default Dashboard;
