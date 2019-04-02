import React, {Component} from 'react';
import { Table, Icon, Button, Modal, Form } from 'semantic-ui-react'; 
import MainForm from './mainform';
import * as apiCall from "../../api/api";
import './main.css';

const terms = {
	"1A": 0, "1B": 1, "2A": 2, "2B": 3, "3A": 4, "3B": 5, "4A": 6, "4B": 7
}

const AvailableEntry = ({name, id, availability, description, eligible, usefulScore, easyScore, handleSelectCourse}) => {
	return (
		<Table.Row>
			<Table.Cell>{id.toUpperCase()}</Table.Cell>
			<Table.Cell>{name}</Table.Cell>
			<Modal
				trigger={<Table.Cell textAlign="left">
							<button className="info-button">
								<Icon className="info"></Icon>
							</button>
						</Table.Cell>}
				basic size='tiny'
			>
				<div className="popup">{description}</div>
			</Modal>
			<Table.Cell textAlign="center">{availability}</Table.Cell>
			<Table.Cell textAlign="center"><Icon className={eligible}/></Table.Cell>
			<Table.Cell textAlign="center">{easyScore}</Table.Cell>
			<Table.Cell textAlign="center">{usefulScore}</Table.Cell>
			<Table.Cell>
				<Form className="add-course"
					course_name={name} course_id={id} eligible={eligible}
					availability={availability} useful={usefulScore} easy={easyScore}
					onSubmit={handleSelectCourse}
				>
				<button type="submit" className="submit-course">
					<Icon.Group>
						<Icon className='calendar check outline'/>
						<Icon className='add corner'/>	
					</Icon.Group>
				</button>
				</Form>
			</Table.Cell>
		</Table.Row>
	);
}

const SelectedEntry = ({name, id, easy, useful, availability, eligible}) => {
	return (
		<Table.Row>
			<Table.Cell>{name} ({id})</Table.Cell>
			<Table.Cell>{easy}</Table.Cell>
			<Table.Cell>{useful}</Table.Cell>
			<Table.Cell>{availability}</Table.Cell>
			<Table.Cell><Icon className={eligible}/></Table.Cell>
		</Table.Row>
	);
}

const TakenEntry = ({id, name}) => {
	return (
		<Table.Row>
				<Table.Cell className="smaller">{id}</Table.Cell>
			<Table.Cell className="smaller">{name}</Table.Cell>
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
			// courses selected from available loads selected
			selected:[],
			// courses filtered from allCourses loads available on second time
			available:[],
			// courses from API
			allCourses:[],
			// requirements from API
			termRequirements: [],

			program: 'MSCI',
			classOf: '',
			nextTerm: '',
			average: '',
			showForm: false
		};

		this.handleOpenForm = this.handleOpenForm.bind(this);
		this.handleCloseForm = this.handleCloseForm.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleSelectCourse = this.handleSelectCourse.bind(this);
	}

	handleOpenForm(){
		this.setState({showForm: true});
	}

	handleCloseForm(){
		this.setState({showForm: false});
	}

	handleSelectCourse(e){
		e.preventDefault();

		var selected_obj = {
			name: e.target.getAttribute("course_name"),
			id: e.target.getAttribute("course_id").toUpperCase(),
			availability: e.target.getAttribute("availability"),
			eligible: e.target.getAttribute("eligible"),
			easy: e.target.getAttribute("easy"),
			useful: e.target.getAttribute("useful")
		}

		var canAdd = true;
		this.state.selected.forEach((entry) => {
			if (entry.id == e.target.getAttribute("course_id").toUpperCase()){
				canAdd = false
			}
		})
		if (canAdd){
			var selected = [...this.state.selected, selected_obj];
			this.setState({selected})
		}
	}

	handleSave(user_info){
		this.setState({
			classOf: user_info.classOf,
			nextTerm: user_info.nextTerm,
			average: user_info.average,
			showForm: false
		})

		// list of terms completed
		var terms_completed = [];
		// list of terms to come
		var terms_not = [];
		var nextVal = terms[user_info.nextTerm]
		for (var key in terms){
			if (terms.hasOwnProperty(key)){
				if (terms[key] <= nextVal) {
					terms_completed.push(key);
				} else {
					terms_not.push(key);
				}
			}
		}

		// get the right term in the right calendar year 
		var temp_courses_taken = this.state.taken;
		// filter out the term requirements state
		var correct_term_req = [];
		terms_completed.forEach((completed) => {
			this.state.termRequirements.forEach((term) => {

				// collect all courses taken by default calendar, elective indicated
				if (term.classOf == user_info.classOf && term.term == completed){
					temp_courses_taken = [...temp_courses_taken, ...term.courses, ...user_info.taken];
					correct_term_req.push(term);
				}
			});
		});

		// get number of electives per term
		terms_not.forEach((futureTerm) => {
			this.state.termRequirements.forEach((term) => {
				if (term.classOf == user_info.classOf && term.term == futureTerm){
					correct_term_req.push(term);
				}
			})
		})

		// remove duplicates in temp_courses_taken
		var filtered_list = [];
		temp_courses_taken.forEach((t) => {
			if (!(filtered_list.includes(t))){
				filtered_list.push(t);
			}
		})

		// in callback, filter out allCourses into available, checking prereqs
		this.setState({taken: filtered_list, termRequirements: correct_term_req}, 
			function() {
				var available = [];
				this.state.allCourses.forEach((course) => {
					if (course.department == this.state.program){
						if (course.prereq){
							course.prereq.forEach((pre) => {
								if (pre){
									var inCourse = filtered_list.includes(pre.toUpperCase());
									var inTerm = terms_completed.includes(pre.toUpperCase());
									var alreadyAdded = available.includes(course.courseId);

									if ((inCourse || inTerm) && alreadyAdded == false){
										available.push(course.courseId.toUpperCase());
									}
								}
							})
						} else{
							available.push(course.courseId.toUpperCase());
						}
					}
				});
				this.setState({available: available, selected:[]});
			}
		);
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

			var t = [];
			response.response.map((entry) => {
				var program = entry.program;
				var classOf = entry.class;

				var termDict = entry.terms;
				for (var key in termDict){
					if (termDict.hasOwnProperty(key)){
						var tempObj = termDict[key];
						tempObj["program"] = program;
						tempObj["classOf"] = classOf;
						t.push(tempObj);
					}
				}
			})
			this.setState({termRequirements: t});
		}
	}

	componentWillMount(){
		this.loadCourses();
		this.loadRequirements();
	}

	render(){
		const {classOf, program, showForm, allCourses} = this.state;

		var available = [];
		// initially loads all management courses in available table
		if (!(this.state.classOf)){
			this.state.allCourses.forEach((course) => {
				if (course.department === program){
					var new_obj ={
						id: course.courseId,
						department: course.department,
						name: course.courseName,
						easyScore: course.easyScore,
						usefulScore: course.usefulScore,
						eligible: "question",
						description: course.description,
						availability: course.availability.join(", "),
						prereq: course.prereq
					};
					available.push(new_obj);
				}
			});
		} else{
			this.state.allCourses.forEach((course) => {
				if (course.department === program){
					if (!(this.state.taken.includes(course.courseId.toUpperCase()))){
						var eligible = "times";
						if (this.state.available.includes(course.courseId.toUpperCase())){
							eligible = "check";
						}

						var new_obj ={
							id: course.courseId,
							department: course.department,
							name: course.courseName,
							easyScore: course.easyScore,
							usefulScore: course.usefulScore,
							eligible: eligible,
							description: course.description,
							availability: course.availability.join(", "),
							prereq: course.prereq
						};
						available.push(new_obj);
					}
				}
			});
		}
		
		const availableEntries = available.map((elem) => (
			<AvailableEntry key={elem.id} {...elem} handleSelectCourse={this.handleSelectCourse} />
		));

		const selectedEntries = this.state.selected.map((s) => (
			<SelectedEntry key={s.id} {...s} />
		));


		// get course names of taken courses
		var taken_pre = [];
		this.state.taken.forEach((courseTaken) => {
			var courseName = "";
			this.state.allCourses.forEach((course) => {
				var id = course.courseId.toUpperCase();
				if (id == courseTaken){
					courseName = course.courseName;
					taken_pre.push({name: courseName, id: id});
				}
			})
			if (!(courseName)){
				taken_pre.push({name: "N/A", id: courseTaken});
			}
		});

		const takenEntries = taken_pre.map((t) => (
			<TakenEntry key={t.id} {...t}/>
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
						onSave={this.handleSave}
					/>
				</Modal>
				<div className="section-one">
					<div className="selected-table">
						<h3>Want to Take</h3>
						<Table className="ui celled table">
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell className="six wide" textAlign='center'>Course</Table.HeaderCell>
									<Table.HeaderCell className="three wide" textAlign='center'>Easiness</Table.HeaderCell>
									<Table.HeaderCell className="three wide" textAlign='center'>Usefulness</Table.HeaderCell>
									<Table.HeaderCell className="three wide" textAlign='center'>Term</Table.HeaderCell>
									<Table.HeaderCell className="one wide" textAlign='center'>Eligible</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{selectedEntries}
							</Table.Body>
						</Table>
					</div>
					<div className="taken-table">
						<h3>Taken</h3>
						<Table className="ui celled table">
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell className="four wide smaller" textAlign='center'>Code</Table.HeaderCell>
									<Table.HeaderCell className="twelve wide smaller" textAlign='center'>Course</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{takenEntries}
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
								<Table.HeaderCell className="five wide" textAlign='center'>Course</Table.HeaderCell>
								<Table.HeaderCell className="two wide" textAlign='center'></Table.HeaderCell>
								<Table.HeaderCell className="one wide smaller" textAlign='center'>Availability</Table.HeaderCell>
								<Table.HeaderCell className="two wide smaller" textAlign='center'>Eligible</Table.HeaderCell>
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