import React from 'react';
import ProgramStatus from './ProgramStatus.jsx';

class StatusBar extends React.Component {
      render() {
      	return (
	    <div className="row">
		<div className="col-sm-1">
		    <ProgramStatus />
		</div>
	    </div>
	    );
}
}

export default StatusBar;
