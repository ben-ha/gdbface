import React from 'react';
import ControlKeys from './ControlKeys.jsx';
import TopBar from './TopBar.jsx';
import Dashboard from './Dashboard.jsx';

class App extends React.Component {
   render() {
      return (
      	 <div>
         <TopBar />
         <ControlKeys />
	 <Dashboard />
	 </div>
      );
   }
}

export default App;