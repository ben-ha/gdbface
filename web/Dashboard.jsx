import React from 'react';
import ConsoleView from './ConsoleView.jsx';
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
	       <div id="mainarea" style={{"width":"70%", "float":"left", "height":"80%"}}>
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
	       <div id="bottomarea" style={{"clear": "left"}}>
		<ConsoleView />
		<HexView ElementsInRow={16} />
		</div>
		</div>
	</div>
	);
      }
}

export default Dashboard;
