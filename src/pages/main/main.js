import React, {Component} from 'react';
import { Input, Table, Icon, Button, Form } from 'semantic-ui-react'; 
import * as apiCall from "../../api/api";
import './main.css';

const RestrictionEntry = ({description, quantity}) => {
	return (
		<Table.Row>
			<Table.Cell>{description}</Table.Cell>
			<Table.Cell>{quantity}</Table.Cell>
		</Table.Row>
	);
}

class MainPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			taken:[],
			selected:[],
			available:[]
		};
	}

	reset(){
		window.location.reload();
	}
/*
	async loadInventory(){
		let response = await inventoryAPI.getInventory();
		if (response.status === 200 && response.response){
			var inventory = {}
			response.response.forEach((entry) => {
				if (inventory[entry.name]){
					inventory[entry.name] = inventory[entry.name] + entry.stock;
				} else {
					inventory[entry.name] = entry.stock;
				}
			});
			this.setState({inventory});
		}
	}*/

	componentWillMount(){
//		this.loadInventory();
	}

	render(){
		
		return(
			<div>
				<div className="user-button">
					<Button color="teal">User Info</Button>
				</div>
				<div className="section-one">
					<div className="selected-table">
						<h3>Selected Courses</h3>
						<Table className="ui celled table">
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell className="seven wide" textAlign='center'>Course</Table.HeaderCell>
									<Table.HeaderCell className="three wide" textAlign='center'>Easiness</Table.HeaderCell>
									<Table.HeaderCell className="three wide" textAlign='center'>Usefulness</Table.HeaderCell>
									<Table.HeaderCell className="three wide" textAlign='center'>Score</Table.HeaderCell>
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
					<Table className="ui table celled">
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell className="seven wide" textAlign='center'>Course</Table.HeaderCell>
								<Table.HeaderCell className="two wide" textAlign='center'>Availability</Table.HeaderCell>
								<Table.HeaderCell className="two wide" textAlign='center'>Eligible</Table.HeaderCell>
								<Table.HeaderCell className="one wide smaller" textAlign='center'>Easiness</Table.HeaderCell>
								<Table.HeaderCell className="one wide smaller" textAlign='center'>Usefulness</Table.HeaderCell>
								<Table.HeaderCell className="one wide smaller" textAlign='center'>Score</Table.HeaderCell>
								<Table.HeaderCell className="one wide"></Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>
						</Table.Body>
					</Table>
				</div>
			</div>
		);
	}
}

export default MainPage;