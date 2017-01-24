import React from 'react';

class TopBar extends React.Component {
      render() {
      	return (
<nav className="navbar navbar-light" style={{"backgroundColor":"#e74c3c"}}>
  <div className="container-fluid">
    <div className="navbar-header" style={{"color":"white"}}>
    	 <h1>GDBFace</h1>
    </div>
  </div>
</nav>
);
}
}

export default TopBar;