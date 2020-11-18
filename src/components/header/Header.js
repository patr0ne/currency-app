import React, {useContext} from 'react';
import { RateContext } from '../../context/RateContext';
import { Navbar } from '../navbar/Navbar';
import './header.scss';

export const Header = () => {

	const {modalShowHandler, profileMenuShowHandler} = useContext(RateContext)
	
	return(
		<div className = 'header'>
			<div className = 'headerWrap'>
				<div className = 'logo'>
					<a href = '/'>
						<h2>Rate App</h2>
					</a>
				</div>

				<Navbar />

				<div className = 'person'>
					<i className = 'fa fa-user' aria-hidden = 'true' onClick = {profileMenuShowHandler}/>
				</div>
			</div>
			<hr />
		</div>
	)
};