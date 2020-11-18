import React, {Fragment, useState, useContext} from 'react';
import { RateContext } from '../../context/RateContext';
import './profilemenu.scss';

export const ProfileMenu = () => {

	const {state} = useContext(RateContext)

	const cls = ['profileMenu']

	if(state.showProfileMenu){
		cls.push('profileMenuShow')
	}

	return (
		<div className = {cls.join(' ')} >
			<Fragment>
			<div>
					<ul>
						<li><a href="#Create Page">Create Page</a></li>
						<li><a href="#Manage Pages">Manage Pages</a></li>
						<li><a href="#Create Ads">Create Ads</a></li>
						<li><a href="#Manage Ads">Manage Ads</a></li>
						<li><a href="#Activity Logs">Activity Logs</a></li>
						<li><a href="#Setting">Setting</a></li>
						<li><a href="#Log Out">Log Out</a></li>
					</ul>
			</div>
			</Fragment>
		</div>
	)
};