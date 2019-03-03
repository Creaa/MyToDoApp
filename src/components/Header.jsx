import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'
import './Header.css';
library.add(faThumbtack)

class Header extends Component {
	render() {
		return (
			<div>
				<header>
					<h1 className="title">
						<FontAwesomeIcon
							icon="thumbtack"
							className="fas thumbstack"
						/>
						MyTodoList
            </h1>
				</header>
			</div>
		)
	}
}

export default Header;
