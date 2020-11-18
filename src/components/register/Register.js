import React, {Fragment, useContext} from 'react';
import { RateContext } from '../../context/RateContext';
import { Button } from '../button/Button';
import './register.scss';

export const Register = () => {
	
	const {renderInputs, state, registerHandler} = useContext(RateContext)

	return(
		<Fragment>
			<div className = 'modalForm'>
				{renderInputs()}
			</div>
			<div className = 'modalBtn'>
				<Button text = 'Зарегистрироваться' disabled = {!state.isFormValid} click = {registerHandler}/>
			</div>
		</Fragment>
	)
};