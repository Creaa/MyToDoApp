import React, { Component } from 'react';
import './ToDoList.css';

class ToDoList extends Component {
	constructor() {
		super();
		this.state = {
			tasksList: [
				{
					id: 1,
					description: "Laundry",
				},
				{
					id: 2,
					description: "Jogging"
				}
			],
			animationTrigger: undefined,
			taskInput: '',
			displayInput: false
		}
	}

	displayInputHandler = () => {
		this.setState({
			displayInput: true
		})
	}

	addNewTask = () => {
		if (this.state.taskInput.length > 0) {
			let temporaryTasksList = this.state.tasksList;
			let biggestNumber = temporaryTasksList.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
			temporaryTasksList.push({
				id: temporaryTasksList.length === 0 ? 1 : biggestNumber[temporaryTasksList.length - 1].id + 1,
				description: this.state.taskInput
			})
			this.setState({
				tasksList: temporaryTasksList,
				displayInput: false,
				taskInput: ''
			})
		}
	}

	removeTask = (element, result, index) => {

		if (result === 'completed') {
			this.setState({
				tasksList: element,
				animationTrigger: "TaskCompleted 1s forwards",
				disableButton: true
			})
			setTimeout(() => {
				element.splice(index, 1)
				this.setState({
					tasksList: element,
					disableButton: false
				})
			}, 1000);
		}

		if (!this.state.disableButton && result === "remove") {
			this.setState({
				tasksList: element,
				animationTrigger: "TaskRemoved 1s forwards",
				disableButton: true
			})
			setTimeout(() => {
				element.pop()
				this.setState({
					tasksList: element,
					disableButton: false
				})
			}, 1000);
		}
	}

	removeLatestTask = () => {
		if (this.state.tasksList.length > 0) {
			let temporaryTasksList = this.state.tasksList
			temporaryTasksList[temporaryTasksList.length - 1].animated = true;
			this.removeTask(temporaryTasksList, "remove")
		}
	}

	clearList = () => {
		this.state.tasksList.forEach((el) => {
			el.animated = true;
			this.removeTask(this.state.tasksList, "remove")
		})
	}

	completeTask = (e) => {
		let temporaryTasksList = this.state.tasksList
		let indexOfObject = temporaryTasksList.findIndex(x => x.id === parseInt(e.target.getAttribute('itemID')))
		temporaryTasksList[indexOfObject].animated = true;
		this.removeTask(temporaryTasksList, "completed", indexOfObject)
	}

	taskInputHandler = (e) => {
		this.setState({
			taskInput: e.target.value
		})
	}

	RejectTask = () => {
		this.setState({
			displayInput: false,
			taskInput: ''
		})
	}



	render() {
		return (
			<div className="list-wrapper">
				<div className="control-bar">
					<button className="control-button add" onClick={this.displayInputHandler}>Add</button>
					<button className="control-button remove" onClick={this.removeLatestTask}>Remove</button>
					<button className="control-button clear" onClick={this.clearList}>Clear</button>
				</div>
				<div style={{ display: this.state.displayInput ? "block" : "none" }} className="new-task-form">
					<textarea value={this.state.taskInput} placeholder="Enter task description" className="task-input" onChange={this.taskInputHandler}>
					</textarea>
					<button onClick={this.addNewTask} className='control-button add'>Add to list</button>
					<button onClick={this.RejectTask} className='control-button remove'>Reject</button>
				</div>
				<ul className="tasks-list">
					{this.state.tasksList.map((el) => {
						return (
							<li
								key={el.id}
								className="task-item"
								style={{ animation: el.animated ? `${this.state.animationTrigger}` : false }}
							>
								<div className="task-number">
									<img className="check-button"
										src="https://cdn.pixabay.com/photo/2013/07/12/17/00/approved-151676__340.png"
										alt="check"
										itemID={el.id}
										onClick={this.completeTask}
									/> #{el.id}
								</div>
								<p className="task-description">{el.description}</p>
							</li>
						)
					})}
				</ul>
			</div>
		);
	}
}

export default ToDoList;
