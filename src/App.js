import React from 'react';
import './App.scss';
import Layout from './components/layout/Layout';
import {RateContext} from './context/RateContext';
import axios from 'axios'

import CHF from './image/CHF.png';
import CNY from './image/CNY.png';
import EUR from './image/EUR.png';
import GBP from './image/GBP.png';
import JPY from './image/JPY.png';
import RUB from './image/RUB.png';
import USD from './image/USD.png';
import { Dark } from './components/dark/Dark';
import { Modal } from './components/modal/Modal';
import { Input } from './components/input/Input';
import { ProfileMenu } from './components/profileMenu/ProfileMenu';

function validateEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};


class App extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			auth: false,
			error: '',
			//форма регистрации
			formControls: {
				email: {	value: '', 
							type: 'email',
							label: 'Email',
							errorMessage: 'Введите корректный Email',
							valid: false,
							touched: false,
							validation: {
								required: true,
								email: true
							}
						},
				password: {	value: '', 
							type: 'password',
							label: 'Пароль',
							errorMessage: 'Введите корректный пароль',
							valid: false,
							touched: false,
							validation: {
											required: true,
											minLenght: 6
							}
						}
			},
			//валюты
			base: 'USD',
			rate: '',
			date: '',
			currency: { USD: {name: 'Доллар США', flag: USD, course: ''},
						CNY: {name: 'Китайский Юань', flag: CNY, course: ''},
						EUR: {name: 'Евро', flag: EUR, course: ''},
						GBP: {name: 'Фунт Стерлингов', flag: GBP, course: ''},
						JPY: {name: 'Японская Йена', flag: JPY, course: ''},
						RUB: {name: 'Российский Рубль', flag: RUB, course: ''},
						CHF: {name: 'Швейцарский Франк', flag: CHF, course: ''},
			},
			//калькулятор
			inputValue: 100,
			currencyValue: 'USD',
			result: null,
			//sample
			sample: {base: 'USD', base2: 'RUB', date: '', course: ''},
			sampleList: '',
			//окно регистрации
			showModal: false,
			isFormValid: false,
			//выпадающее меню
			showProfileMenu: false
		}
	};

	//методы


	loginHandler = async() => {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true
		}
		
		try{
			const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXzhGxizYldvECM07woacua3tG5JRbOQY', authData)
			if(response.data.idToken){
				const formControls = {...this.state.formControls}
				formControls.email.value = ''
				formControls.password.value = ''

				this.setState({auth: true, showModal: false, error: '', formControls})
			}
		}catch (e){
			console.log(e)
			this.setState({error: 'Ошибка'})
		}
	};

	registerHandler = async() => {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true
		}
		
		try{
			const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXzhGxizYldvECM07woacua3tG5JRbOQY', authData)
			if(response.data.idToken){
				const formControls = {...this.state.formControls}
				formControls.email.value = ''
				formControls.password.value = ''

				this.setState({auth: true, showModal: false, error: '', formControls})
			}
		}catch (e){
			console.log(e)
			this.setState({error: 'Ошибка'})
		}
	};

	profileMenuShowHandler = () => {
		this.setState({showProfileMenu: true})
	}

	profileMenuHideHandler = () => {
		this.setState({showProfileMenu: false})
	}

	modalShowHandler = () => {
		this.setState({showModal: true})
	};

	modalHideHandler = () => {
		this.setState({showModal: false})
	};

	validateControl(value, validation){
		if (!validation){
			return true
		}
		let isValid = true
		if (validation.required){
			isValid = value.trim() !== '' && isValid
		}
		if (validation.email){
			isValid = validateEmail(value) && isValid
		}
		if (validation.minLenght){
			isValid = value.length >= validation.minLenght && isValid
		}

		return isValid
	};

	onСhangeHandler = (event, controlName) => {
		const formControls = {...this.state.formControls}
		const control = {...formControls[controlName]}

		control.value = event.target.value
		control.touched = true
		control.valid = this.validateControl(control.value, control.validation)
		formControls[controlName] = control

		let isFormValid = true

		Object.keys(formControls).forEach(name => {
			isFormValid = formControls[name].valid && isFormValid
		})

		this.setState({formControls, isFormValid})

	}

	renderInputs = () => {
		return Object.keys(this.state.formControls).map((controlName, i) => {
			const control = this.state.formControls[controlName]
			return(
				<Input
					key = {controlName + i}
					type = {control.type}
					value = {control.value}
					valid = {control.valid}
					touched = {control.touched}
					label = {control.label}
					errorMessage = {control.errorMessage}
					shouldValidate = {true}
					onChange = {(event) => this.onСhangeHandler(event, controlName)}
				/>
			)
		})
	}

	baseHandler = (event) => {
		this.setState({
			sample: {...this.state.sample, base: event.target.value}
		})
	};
	
	base2Handler = (event) => {
		this.setState({
			sample: {...this.state.sample, base2: event.target.value}
		})
	};

	sampleDateHandler = (event) => {
		this.setState({
			sample: {...this.state.sample, date: event.target.value}
		})
	};

	dataWrite = async () => {
		await fetch(`https://api.exchangeratesapi.io/${this.state.sample.date}?base=${this.state.sample.base}`)
		.then((response) => response.json()).then((response) => {
			this.setState({
				sample: {...this.state.sample, course: response.rates[this.state.sample.base2]}
			})
		})

		await axios.post('https://test-auth-0-2.firebaseio.com/sample.json', this.state.sample)
		.then((response) => {
			return('')
		})

		await axios('https://test-auth-0-2.firebaseio.com/sample.json')
		.then((response) => {
			this.setState({sampleList: response.data})
		})
	};

	sampleRemove = async (id) => {
		let sampleList = {...this.state.sampleList}
		delete sampleList[id]
		this.setState({sampleList})

		await axios.delete(`https://test-auth-0-2.firebaseio.com/sample/${id}.json`)
	};

	inputValueHandler = (event) => {
		this.setState({
			inputValue: event.target.value,
			result: null
		})
	};

	currencyValueHandler = (event) => {
		this.setState({
			currencyValue: event.target.value,
			result: null
		})
	};

	calculatorHandler = async (value) => {
		let result

		await fetch(`https://api.exchangeratesapi.io/latest?base=RUB`)
		.then((response) => response.json()).then((response) => {
			result = response.rates[value] * this.state.inputValue
		})

		this.setState({result})
	};
	
	componentDidMount(){
		fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
		.then((response) => response.json()).then((response) => {
			//console.log(response)
			const rateArr = ['USD', 'CNY', 'EUR', 'GBP', 'JPY', 'RUB', 'CHF']
			const currency = {...this.state.currency}

			for (let i = 0; i < rateArr.length; i++){
				currency[rateArr[i]].course = response.rates[rateArr[i]]
			}
			this.setState({
				rate: response.rates,
				date: response.date,
				currency
			})
		})

		/* axios('https://test-auth-0-2.firebaseio.com/sample.json')
		.then((response) => {
			this.setState({sampleList: response.data})
		}) */
	}
		
	render(){

		return(
			<RateContext.Provider 
				value = {{	state: this.state,
							inputValueHandler: this.inputValueHandler,
							currencyValueHandler: this.currencyValueHandler,
							calculatorHandler: this.calculatorHandler,
							baseHandler: this.baseHandler,
							base2Handler: this.base2Handler,
							sampleDateHandler: this.sampleDateHandler,
							dataWrite: this.dataWrite,
							sampleRemove: this.sampleRemove,
							renderInputs: this.renderInputs,
							modalHideHandler: this.modalHideHandler,
							modalShowHandler: this.modalShowHandler,
							loginHandler: this.loginHandler,
							registerHandler: this.registerHandler,
							profileMenuShowHandler: this.profileMenuShowHandler,
							profileMenuHideHandler: this.profileMenuHideHandler
						}}>
			<ProfileMenu/>
			<Dark showModal = {this.state.showModal} modalHideHandler = {this.modalHideHandler}/>
			<Modal/>
			<Layout/>	

			</RateContext.Provider>
		);
	};
};

export default App;
