/**
*
* home.js
* Employee explorer page.
*
* @author - Faizal
* @date   - 25 August 2020
*
***/
// REACT NATIVE IMPORT
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { Autocomplete }  from '@material-ui/lab';

// ALL SERVICES
import * as API from '../../service/api';

// ALL SHARED FILES
import * as Constant from '../../helper/constant';

export const HomePage = (props) => {

	// DECLARE STATE VARIABLE
	const [state, setState] = useState([]);
	const [selectedEmployee, setSelectedEmployee] = useState("");

	// DECLARE LOCAL VARIABLE
	const history = useHistory();

	// USE EFFECT ON LOAD PROCESS
	useEffect(() => {
		// FETCH ALL EMPLOYEE
		getAllEmployee();
	}, []);

	/**
	* FUNCTION USED TO FETCH ALL THE EMPLOYEE
	* @INPUT - NA
	* @OUTPUT - NA
	*/
	const getAllEmployee = () => {
		/* CALLING /GETALLFILES FUNCTION TO FETCH ALL THE EMPLOYEE */
		API.get({URL: Constant.URL.GET_OVERVIEW}).then((result) => {
			setState(result);
		}).catch((error) => {
		  console.log(error);
		});
	};

	/**
	* FUNCTION USED TO UPDATE THE STATE
	* @INPUT - NA
	* @OUTPUT - NA
	*/
	const updateEmployee = () => {
		if (!selectedEmployee) {
			alert("Please select an Employee.");
			return;
		}
		history.push('/overview/'+selectedEmployee);
	}

	// RENDER HTML
	return(
		<div id="employee-explorer">
			<h1>Employee Explorer</h1>
			<div className="row">
				<div className="col"></div>
				<div className="employee-search-container text-right">
					<Autocomplete
						id="selected-employee"
						options={state}
						onChange={(event, newValue) => {
							setSelectedEmployee(newValue ? newValue : '');
						}}
						inputValue={selectedEmployee}
						getOptionLabel={(option) => option}
						style={{ width: 300 }}
						renderInput={(params) => <TextField {...params} label="Employee" variant="outlined" />}
				    />
				</div>
				<div className="employee-search-btn-container text-left">
					<Button variant="contained" onClick={() => updateEmployee()}>Search</Button>
				</div>
				<div className="col"></div>
			</div>
		</div>
	)
}