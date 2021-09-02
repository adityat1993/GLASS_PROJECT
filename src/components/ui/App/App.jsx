import React, { useEffect, useState } from 'react'
import moment from 'moment'

import Calendar from '../Calendar/Calendar'

const App = props => {

	const [ShowCalendar, toggleShowCalendar] = useState(false)
	const [ActiveDate, setActiveDate] = useState(new Date())

	const dateChangeHandler = date => {
		toggleShowCalendar(false)
		console.log("ActiveDateActiveDate::", ActiveDate);
	}

	useEffect(() => {
		if (props.onDateChange) props.onDateChange(new Date(moment(ActiveDate).format('YYYY-MM-DD')))
	}, [ActiveDate, props])

	return (
		props.hasCalendar ?
			ShowCalendar ?
				<Calendar onSelect={dateChangeHandler} date={ActiveDate} /> :
				<div className="tasks__app">
					<div className="tasks__app__header">
						<div onClick={() => { setActiveDate(old => { return moment(old).subtract(1, 'day') }) }} className="typo typo__h u-c-pointer noselect">&#8592;</div>
						<div className="typoe typo__b u-c-pointer noselect" onClick={() => { toggleShowCalendar(true) }}>{moment(ActiveDate).format('YYYY-MM-DD')}</div>
						<div onClick={() => { setActiveDate(old => { return moment(old).add(1, 'day') }) }} className="typo typo__h u-c-pointer noselect">&#8594;</div>
					</div>
					<div className="tasks__app__body">
						{props.children}
					</div>
				</div>
			:
			<div className="tasks__app">
				<div className="tasks__app__header">
					<div>&nbsp;</div>
					<div className=" settings__app__header__heading typoe typo__b">{props.heading}</div>
					<div>&nbsp;</div>
				</div>
				<div className="tasks__app__body">
					{props.children}
				</div>
			</div>
	)
}

export default App