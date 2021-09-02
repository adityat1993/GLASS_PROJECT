import React from 'react'

import InfiniteCalendar from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'

const Calendar = props => {

	const theme = {
		accentColor: '#000000',
		floatingNav: {
			background: '#ffffff',
			chevron: 'rgba(255, 255, 255, 0)',
			color: '#000000',
		},
		headerColor: '#000000',
		selectionColor: '#000000',
		textColor: {
			active: '#FFFFFF',
			default: '#000000',
		},
		todayColor: '#000000',
		weekdayColor: '#000000',
	}

	const locale = {
		blank: 'Select a date...',
		headerFormat: 'MMMM Do YYYY',
		todayLabel: {
			long: 'Today',
		},
		weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		weekStartsOn: 1,
	}

	return (
		<InfiniteCalendar width={800} height={350} selected={props.date} theme={theme} overscanMonthCount={2} rowHeight={65} locale={locale} onSelect={date => props.onSelect(date)} />
	)
}

export default Calendar