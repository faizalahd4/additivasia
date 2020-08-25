/**
*
* overview.js
* Employee overview page.
*
* @author - Faizal
* @date   - 25 August 2020
*
***/
// REACT NATIVE IMPORT
import React, {useState, useEffect} from 'react';

// ALL SERVICES
import * as API from '../../service/api';

// ALL SHARED FILES
import * as Constant from '../../helper/constant';

// ALL COMPONENT
import { EmployeeItem } from '../../component/employeeItem';

export const OverviewPage = (props) => {

	// DECLARE LOCAL VARIABLE
	const { match: { params } } = props;

	// DECLARE STATE VARIABLE
	const [state, setState] = useState({ role: '', name: '', directSubordinates: []});
	const [selectedEmployee, setSelectedEmployee] = useState("");
	const [directSubordinates, setDirectSubordinates] = useState([]);

	// DECLARE LOCAL VARIABLE
	useEffect(() => {
		// UPDATE SELECTED EMPLOYEE IN THE STATE
		setSelectedEmployee(params.name);
		// FETCH OVERVIEW OF AN EMPLOYEE
		getOverview(params.name)
	}, []);


	/**
	* FUNCTION USED TO FETCH THE OVERVIEW OF AN EMPLOYEE
	* @INPUT  - String - Employee name
	* @OUTPUT - NA
	*/
	const getOverview = (value) => {
		/* CALLING /GETALLFILES FUNCTION TO FETCH ALL THE EMPLOYEE */
		API.get({URL: Constant.URL.GET_OVERVIEW + value}).then((result) => {
			if (result[1]) {
				var directSubordinates = result[1]['direct-subordinates'].map(item => {
					return { role: '', name: item, directSubordinates: []}
				})
			}
			setState({...state, role: result[0], name: value, directSubordinates});
		}).catch((error) => {
		  console.log(error);
		});
	};

	// RENDER HTML
	return(
		<div id="employee-overview">
			<h1>Employee Overview</h1>
			<h3>Subordinates of employee {state.name} - {state.role}:</h3>
			<div className="overview-list">
				<ul>
				{
					state.directSubordinates.map((item, index) => {
						return (
							<li key={item.name + index}>
								<EmployeeItem data={state} dataName={item.name} dataIndex={index}/>
							</li>
						)
					})
				}
				</ul>
			</div>
		</div>
	)
}