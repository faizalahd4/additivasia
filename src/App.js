/**
*
* App.js
* Starting of the app
*
* @author - Faizal
* @date   - 25 August 2020
*
***/
// REACT NATIVE IMPORT
import React, {useReducer, useContext, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// ALL PAGE FILES
import {HomePage} from './scripts/view/pages/home';
import {OverviewPage} from './scripts/view/pages/overview';

function App() {

	// RENDER HTML
	return (
		<div className="App">
		  <Router basename={'/'}>
		    <Route path="/" exact component={HomePage}/>
		    <Route path="/overview/:name" exact component={OverviewPage}/>
		  </Router>
		</div>
	);
}

export default App;
