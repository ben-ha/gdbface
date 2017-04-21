import React from 'react';
import ControlKeys from './ControlKeys.jsx';
import TopBar from './TopBar.jsx';
import StatusBar from './StatusBar.jsx';
import Dashboard from './Dashboard.jsx';
import {InitDispatcher, GetDispatcher} from './Dispatcher.js';
import {InitDataStore} from './DataStore.js';
import {InitUIProxy} from './UIProxy.js';
import GDBActions from './GDBActions.js';

class App extends React.Component {
      constructor(props)
      {
	super(props);
	InitDispatcher();
	InitDataStore(GetDispatcher());
	InitUIProxy();
	GDBActions.GetFullInfo();
      }

      render() {
      return (
      	 <div style={{"height": "100vh"}}>
         <TopBar Height="8%" FontSize="5vh" />
         <ControlKeys Height="5%" />
	 <StatusBar Height="5%"/>
	 <hr />
	 <Dashboard Height="82%" />
	 </div>
      );
   }
}

export default App;
