import React, { useEffect, useState } from 'react'
import Drawer from '../components/nav/Drawer/Drawer'
import PlusIcon from '../assets/icons/ico-plus.svg'
import MinusIcon from '../assets/icons/ico-minus.svg'
import App from '../components/ui/App/App'
import UserController from './Controller/User'
const moment = require("moment");

let googleid = localStorage.getItem(`google`)

const SettingPage = props => {

	const [ActiveRoutine, setActiveRoutine] = useState(null)
	const [ActiveRoutineTitle, setActiveRoutineTitle] = useState("")
	const [data, setData] = useState([])
	const [Routines, setRoutines] = useState([])
	const [NewRoutinesDate, setNewRoutinesDate] = useState("")
	const [NewRoutinesTitle, setNewRoutinesTitle] = useState("")

	var today = moment().format("YYYY-MM-DD");
	var date1 = JSON.stringify(today);


	const toggleDay = (routineId, dayId) => {
		let updateRoutine = Routines.filter(routine => routine._id === routineId)[0]
		let otherRoutines = Routines.filter(routine => routine._id !== routineId)
		updateRoutine.days[dayId] = !updateRoutine.days[dayId]
		let formdata2 = {
			userId: googleid,
			description: updateRoutine.description,
			days: [
				updateRoutine.days[0],
				updateRoutine.days[1],
				updateRoutine.days[2],
				updateRoutine.days[3],
				updateRoutine.days[4],
				updateRoutine.days[5],
				updateRoutine.days[6],
			],
			history: { [date1]: true },

		}
		console.log("up1", updateRoutine.description);
		console.log("form", formdata2);
		UserController.updateRoutineHistory(formdata2, (result) => {
		})
		let routines = [updateRoutine, ...otherRoutines].sort((a, b) => a._id > b._id)

		setRoutines(routines)

	}
	const removeRoutine = (routineId, description) => {
		let payload = {
			description: description
		}
		UserController.removeRoutine(payload, (response) => {
			UserController.getActiveRoutine((response) => {
				setRoutines(response.data.data)
			});
		})


	}
	useEffect(() => {
		UserController.getActiveRoutine((response) => {
			console.log("setting getActiveRoutine ", response.data.data)
			setRoutines(response.data.data)
		});
	}, [])

	const createRoutine = () => {
		setRoutines(Routines => {
			return ([...Routines,
			{
				id: 'routine-' + (Routines.length + 1), description: "New Routine",
				active: true, days: new Array(7).fill(false)
			}]
			)

		})

	}
	const dateChangeHandler = date => {
		console.log("dateone" + { Date: date })
		console.log("date", date.getFullYear() + "-0" +
			date.getMonth() + "-" +
			date.getDate());
		const dateid = `${date.getFullYear() + "-" +
			date.getMonth() + "-" +
			date.getDate()}`
		setNewRoutinesDate(dateid);
	}

	const getRoutines = () => {

		const getDays = (routine) => {
			let daysDOM = []
			routine.days.map((day, index) => {
				daysDOM.push(
					<div className="settings__app__body__grid__days__wrapper" key={routine._id + "-" + index} onClick={() => toggleDay(routine._id, index)}>
						{day ? <div className="settings__app__body__grid__days__done" /> : <div className="settings__app__body__grid__days__undone" />}
					</div>
				)
			})
			return daysDOM
		}

		let routinesDOM = []
		Routines.map(routine => {

			routinesDOM.push(
				<div className="settings__app__body__grid__days" key={routine._id}>
					<div className="settings__app__body__grid__days__wrapper">

						<img className="settings__app__body__grid__icon" src={MinusIcon} alt="Remove" onClick={() => { removeRoutine(routine._id, routine.description) }} />
					</div>
					<div className="settings__app__body__grid__days__wrapper">

						<div className=" settings__app__body__grid__days__task typo" onClick={() => { setActiveRoutine(routine._id); setActiveRoutineTitle(routine.description) }}>

							{

								ActiveRoutine === routine._id ?
									<input className="settings__app__body__grid__days__title__edit typo typo__b"
										onKeyDown={(event) => {

											setNewRoutinesTitle(event.target.value);
											if (event.key == 'Enter' || event.key == 'Escape') {
												console.log("enter event", event.target.value);

												event.preventDefault()
												event.stopPropagation()
												let updateRoutine = Routines.filter((v, i) => { return v._id === ActiveRoutine })[0]
												let oldRoutines = Routines.filter((v, i) => { return v.i_d !== ActiveRoutine })
												updateRoutine.description = ActiveRoutineTitle

												let routines = [updateRoutine, ...oldRoutines].sort((a, b) => a._id > b._id)
												setRoutines(routines)
												setActiveRoutine(null)

												let formdata = {
													userId: googleid,
													description: updateRoutine.description,
													days: [
														updateRoutine.days[0],
														updateRoutine.days[1],
														updateRoutine.days[2],
														updateRoutine.days[3],
														updateRoutine.days[4],
														updateRoutine.days[5],
														updateRoutine.days[6],
													],
													history: {}
												}
												UserController.CreateRoutine(formdata, (response) => {
													UserController.getActiveRoutine((response) => {
														setRoutines(response.data.data)
													});


												})
											}

										}
										}
										value={ActiveRoutineTitle} onChange={e => { setActiveRoutineTitle(e.target.value) }} />
									: routine.description}
						</div>
					</div>
					{getDays(routine)}

				</div>

			)
		})
		return routinesDOM
	}
	return (

		<main>

			<Drawer history={props.history} />
			<div className="settings__container">
				<div className="settings__container__content">
					<App heading={"Routine Settings"} hasCalendar={false}>
						<div className="settings__app__body__grid typo typo__b">
							<div className="settings__app__body__grid__days">
								<div className="settings__app__body__grid__days__wrapper">&nbsp;</div>
								<div className="settings__app__body__grid__days__wrapper">&nbsp;</div>
								<div className="settings__app__body__grid__days__wrapper">Sun</div>
								<div className="settings__app__body__grid__days__wrapper">Mon</div>
								<div className="settings__app__body__grid__days__wrapper">Tue</div>
								<div className="settings__app__body__grid__days__wrapper">Wed</div>
								<div className="settings__app__body__grid__days__wrapper">Thurs</div>
								<div className="settings__app__body__grid__days__wrapper">Friday</div>
								<div className="settings__app__body__grid__days__wrapper">Sat</div>

							</div>

							{getRoutines()}

							<div className="settings__app__body__grid__days">
								<div className="settings__app__body__grid__days__wrapper">
									<img className="settings__app__body__grid__icon" src={PlusIcon} alt="Add" onClick={() => { createRoutine() }} />
								</div>

								<div className="settings__app__body__grid__days__wrapper">&nbsp;</div>
								<div className="settings__app__body__grid__days__wrapper">&nbsp;</div>
								<div className="settings__app__body__grid__days__wrapper">&nbsp;</div>
								<div className="settings__app__body__grid__days__wrapper">&nbsp;</div>
								<div className="settings__app__body__grid__days__wrapper">&nbsp;</div>
								<div className="settings__app__body__grid__days__wrapper">&nbsp;</div>
								<div className="settings__app__body__grid__days__wrapper">&nbsp;</div>
								<div className="settings__app__body__grid__days__wrapper">&nbsp;</div>

							</div>
						</div>

					</App>
				</div>
			</div>

		</main>

	)
}
export default SettingPage


