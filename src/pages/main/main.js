import React, {Component} from 'react';
import { Table, Icon, Button, Modal, Form } from 'semantic-ui-react'; 
import MainForm from './mainform';
import * as apiCall from "../../api/api";
import './main.css';

const AvailableEntry = ({name, id, availability, usefulScore, easyScore}) => {
	return (
		<Table.Row>
			<Table.Cell>{id.toUpperCase()}</Table.Cell>
			<Table.Cell>{name}</Table.Cell>
			<Table.Cell>{availability}</Table.Cell>
			<Table.Cell>TBD</Table.Cell>
			<Table.Cell>{easyScore}</Table.Cell>
			<Table.Cell>{usefulScore}</Table.Cell>
			<Table.Cell>
				<Form className="add-course">
					<Icon.Group>
						<Icon className='calendar check outline'/>
						<Icon className='add corner'/>	
					</Icon.Group>
				</Form>
			</Table.Cell>
		</Table.Row>
	);
}

class MainPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			// list of course ids of course taken
			// updated by program, term level, grad year
			// updated by elective dropdown in form
			taken:[],
			// courses selected from available
			selected:[],
			// courses filtered from allCourses
			available:[],
			// courses from API
			allCourses:[],
			// requirements from API
			termRequirements: [],
			showForm: false
		};

		this.handleOpenForm = this.handleOpenForm.bind(this);
		this.handleCloseForm = this.handleCloseForm.bind(this);
	}

	handleOpenForm(){
		this.setState({showForm: true});
	}

	handleCloseForm(){
		this.setState({showForm: false});
	}

	reset(){
		window.location.reload();
	}

	async loadCourses(){
		let response = await apiCall.getCourses();
		if (response.status === 200 && response.response){
			var courses = [];
			response.response.map((course) => {
				// only works for 4 letter departments for now
				var prereq = []
				if (course.prereq && course.prereq != []){
					prereq = course.prereq;
				}

				var courseName = course.course.substring(0, 4);
				var course_obj = {
					department: courseName.toUpperCase(),
					courseId: course.course,
					courseName: course.name,
					description: course.description,
					easyScore: course.easy,
					usefulScore: course.useful,
					prereq: prereq,
					availability: course.availability,
					notes: course.notes
				};
				courses.push(course_obj);
			});

			this.setState({allCourses: courses});
		}
	}

	async loadRequirements(){
		let response = await apiCall.getRequirements();
		if (response.status === 200 && response.response){
			var courses = [];

			//console.log(response);
		}
	}

	componentWillMount(){
		this.loadCourses();
		this.loadRequirements();
	}

	render(){
		const {showForm, allCourses} = this.state;

		// loads all management courses in available table
		var initial_available = [];
		this.state.allCourses.forEach((course) => {
			if (course.department === "MSCI"){
				var new_obj ={
					id: course.courseId,
					department: course.department,
					name: course.courseName,
					easyScore: course.easyScore,
					usefulScore: course.usefulScore,
					availability: course.availability.join(", "),
					prereq: course.prereq
				};
				initial_available.push(new_obj);
			}
		});
		const availableEntries = initial_available.map((elem) => (
			<AvailableEntry key={elem.id} {...elem} />
		));

		return(
			<div>
				<Modal
					trigger={<div className="user-button"><Button color="teal" onClick={this.handleOpenForm}>User Info</Button></div>}
					centered={true}
					open={showForm}
					basic
					size='mini'
				>
					<MainForm
						data={allCourses}
						onClose={this.handleCloseForm}
					/>
				</Modal>
				<div className="section-one">
					<div className="selected-table">
						<h3>Selected Courses</h3>
						<Table className="ui celled table">
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell className="seven wide" textAlign='center'>Course</Table.HeaderCell>
									<Table.HeaderCell className="three wide" textAlign='center'>Easiness</Table.HeaderCell>
									<Table.HeaderCell className="three wide" textAlign='center'>Usefulness</Table.HeaderCell>
									<Table.HeaderCell className="three wide" textAlign='center'>Term</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
							</Table.Body>
						</Table>
					</div>
					<div className="taken-table">
						<h3>Taken</h3>
						<Table className="ui celled table">
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell className="ten wide" textAlign='center'>Course</Table.HeaderCell>
									<Table.HeaderCell className="six wide smaller" textAlign='center'>Term</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
							</Table.Body>
						</Table>
					</div>
				</div>
				<div className="available-table">
					<h3>Available</h3>
					<Table className="ui table basic selectable">
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell className="two wide" textAlign='center'>Code</Table.HeaderCell>
								<Table.HeaderCell className="six wide" textAlign='center'>Course</Table.HeaderCell>
								<Table.HeaderCell className="two wide" textAlign='center'>Availability</Table.HeaderCell>
								<Table.HeaderCell className="two wide" textAlign='center'>Eligible</Table.HeaderCell>
								<Table.HeaderCell className="one wide smaller" textAlign='center'>Easiness</Table.HeaderCell>
								<Table.HeaderCell className="one wide smaller" textAlign='center'>Usefulness</Table.HeaderCell>
								<Table.HeaderCell className="one wide"></Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{availableEntries}
						</Table.Body>
					</Table>
				</div>
			</div>
		);
	}
}

export default MainPage;