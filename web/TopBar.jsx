import React from 'react';

class TopBar extends React.Component {
    constructor(props)
    {
	super(props);
    }
    
      render() {
      	return (
<nav className="navbar navbar-light" style={{"backgroundColor":"#e74c3c", "height" : this.props.Height}}>
    <div className="container-fluid" style={{"height":"100%"}}>
	<div className="navbar-header" style={{"color":"white", "fontSize": this.props.FontSize, "display":"table", "height" : "100%"}}>
	    <div style={{"display":"table-cell", "verticalAlign" : "middle"}}>GDBFace</div>
	</div>
  </div>
</nav>
);
}
}

export default TopBar;
