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
			class: '',
			nextTerm: '',
			average: '',
			taken: []
		}
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
			<Form className="main-form">
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
						options={yearOptions}
					/>
				</Form.Field>
				<Form.Field>
					<label>Next Academic Term:</label>
					<Dropdown
						fluid selection
						options={termOptions}
					/>
				</Form.Field>
				<Form.Field>
					<label>Previous Term Average:</label>
					<input type="number" min={0} max={100} required />
				</Form.Field>
				<Form.Field>
					<label>Previous Electives:</label>
					<Dropdown 
						fluid selection multiple search
						placeholder="Electives"
						options={electiveOptions}
					/>
				</Form.Field>
				<Button className="submit">Submit</Button>
			</Form>
		);
	}
}

export default MainForm;