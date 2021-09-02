import React, { useEffect } from 'react'
import { useState } from 'react'

import SettingsIcon from '../../../assets/icons/ico-setting.svg'

const Drawer = props => {

	const [ShowRoutineSettings, setShowRoutineSettings] = useState(false)

	useEffect(() => {
		setShowRoutineSettings(props.history.location.pathname === '/home/routine')
	}, [props.history.location.pathname])

	const getClasses = (option) => {
		let classes = ["drawer__nav__wrapper__item__content typoe typo__b"]
		if (props.history.location.pathname === option)
			classes.push("drawer__nav__wrapper__item__content--active")
		return classes.join(" ", ", ")
	}

	return (
		<div className="drawer__nav">

			<div className="drawer__nav__wrapper">

				<div className={props.history.location.pathname !== '/home' ? "drawer__nav__wrapper__item drawer__nav__wrapper__item--hover typo typo__a" : "drawer__nav__wrapper__item drawer__nav__wrapper__item--hide drawer__nav__wrapper__item--hover typo typo__a"} onClick={() => { props.history.push('/home') }}><span className="typo typo__h u-p-b-xs">&#8592;</span>&nbsp;Home</div>
			</div>
			<div className="drawer__nav__wrapper">
				<div className="drawer__nav__wrapper__item typo typo__b" style={{ color: "#A5A5A5" }}>Active</div>
				<div className="drawer__nav__wrapper__item typo typo__b" onClick={() => { props.history.push('/home/notes') }}><div style={{}} className={getClasses('/home/notes')} >Notebook</div></div>
				<div className="drawer__nav__wrapper__item  typo__b" onClick={() => { props.history.push('/home/task') }}><div className={getClasses('/home/task')}>{props.data} Tasks</div></div>
				<div className="drawer__nav__wrapper__item typo typo__b">
					<div className={getClasses('/home/routine')} onClick={() => { props.history.push('/home/routine') }}>Routines</div>
					{ShowRoutineSettings ? <img className="drawer__nav__wrapper__item__icon" onClick={() => { props.history.push('/home/routine/setting') }} src={SettingsIcon} alt="Edit" /> : null}
				</div>
			</div>
			<div className="drawer__nav__wrapper">
				<div className="drawer__nav__wrapper__item typo typo__b" style={{ color: "#A5A5A5" }}>Partly Cloudy 65<br />San Fracisco, CA</div>
				<div className="drawer__nav__wrapper__item typo typo__b" style={{ color: "#A5A5A5" }}>The world is <br />positive today</div>
			</div>

		</div>

	)
}

export default Drawer