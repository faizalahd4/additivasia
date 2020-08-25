/**
*
* employeeItem.js
* Employee item component.
*
* @author - Faizal
* @date   - 25 August 2020
*
***/
// REACT NATIVE IMPORT
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

// ALL SERVICES
import * as API from '../service/api';

// ALL SHARED FILES
import * as Constant from '../helper/constant';

export const EmployeeItem = (props) => {

	// DECLARE STATE VARIABLE
	const [state, setState] = useState({ role: '', name: props.dataName, directSubordinates: []});

	/**
	* FUNCTION USED TO FETCH ALL THE OVERVIEW OF AN EMPLOYEE
	* @INPUT - NA
	* @OUTPUT - NA
	*/
	const getOverview = (value) => {
		/* CALLING /GETALLFILES FUNCTION TO FETCH ALL THE EMPLOYEE */
		API.get({URL: Constant.URL.GET_OVERVIEW + value}).then((result) => {
			console.log(result)
			if (result[1]) {
				var directSubordinates = result[1]['direct-subordinates'].map(item => {
					return { role: '', name: item, directSubordinates: []}
				})
			} else {
				alert(value + " is an employee and dont have direct-subordinates.");
			}
			setState({...state, role: result[0], name: value, directSubordinates});
		}).catch((error) => {
		  console.log(error);
		});
	};

	// RENDER HTML
	return(
	<>
			<div className="list-item-name" onClick={() => getOverview(props.dataName)}>
			<i className="icon-user"></i>&nbsp;&nbsp;{props.dataName}</div>
			<ul>
			{
				state.directSubordinates && state.directSubordinates.map((item, index) => {
					return (
						
						<li key={item.name + index}>
							<EmployeeItem data={state} dataName={item.name} dataIndex={index}/>
						</li>
					)
				})
			}
			</ul>
				
	</>
	)
}