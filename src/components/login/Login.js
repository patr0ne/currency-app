import React, {Fragment, useContext} from 'react';
import { RateContext } from '../../context/RateContext';
import { Button } from '../button/Button';
import './login.scss';

export const Login = () => {

	const {renderInputs, state, loginHandler} = useContext(RateContext)
	
	return(
		<Fragment>
			<div className = 'modalForm'>
				{renderInputs()}
			</div>
			<div className = 'modalBtn'>
				<Button text = 'Войти' disabled = {!state.isFormValid} click = {loginHandler}/>
			</div>
		</Fragment>
	)
};