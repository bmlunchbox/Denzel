import React, {Component} from 'react';
import { Form, Input, Dropdown, Button } from 'semantic-ui-react';
import './mainform.css';

class MainForm extends Component {
	static defaultProps ={
		onClose() {},
		onSave() {}
	}

	constructor(props){
		super(props);
		this.state ={
			program: 'MSCI',
			classOf: '',
			nextTerm: '',
			average: '',
			taken: []
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleDropdownChange = this.handleDropdownChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

	handleDropdownChange(e, data){
		this.setState({[data.name]: data.value});
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.onSave({...this.state});
		this.setState({
			program: 'MSCI',
			classOf: '',
			nextTerm: '',
			average: '',
			taken: []
		});
	}

	render(){
		const {onClose, data} = this.props;

		const years = [2019, 2020, 2021, 2022, 2023, 2024];
		const yearOptions = years.map((year) => (
			{
				key: year,
				value: year,
				text: year
			}
		));

		const terms = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B"];
		const termOptions = terms.map((term) => (
			{
				key: term,
				value: term,
				text: term
			}
		));

		const electiveOptions = data.map((course) => {
			var formattedString = course.courseId.toUpperCase();
			return	{
				key: course.courseId,
				value: formattedString,
				text: formattedString
			}
		});

		return(
			<Form className="main-form" onSubmit={this.handleSubmit}>
				<button
					className="close-button"
					onClick={onClose}
				>x</button>
				<Form.Field>
					<label>Program:</label>
					<Dropdown 
						className="program-dd"
						value="Management Engineering" placeholder="Management Engineering"
						selection fluid disabled
						options={[{key: "Management Engineering", value: "Management Engineering", text: "Management Engineering"}]}
					/>
				</Form.Field>
				<Form.Field>
					<label>Class Of:</label>
					<Dropdown
						fluid selection
						name="classOf"
						placeholder="Graduating Year"
						options={yearOptions}
						onChange={this.handleDropdownChange}
					/>
				</Form.Field>
				<Form.Field>
					<label>Next Academic Term:</label>
					<Dropdown
						fluid selection
						name="nextTerm"
						placeholder="Next Term"
						options={termOptions}
						onChange={this.handleDropdownChange}
					/>
				</Form.Field>
				<Form.Field>
					<label>Previous Term Average:</label>
					<input 
						name="average" type="number" min={0} 
						max={100} placeholder="Latest Term Average" 
						required onChange={this.handleChange}
					/>
				</Form.Field>
				<Form.Field>
					<label>Previous Electives:</label>
					<Dropdown 
						fluid selection multiple search
						name="taken"
						placeholder="Electives"
						options={electiveOptions}
						onChange={this.handleDropdownChange}
					/>
				</Form.Field>
				<Button className="submit-button" color="green" type="submit">Submit</Button>
			</Form>
		);
	}
}

export default MainForm;