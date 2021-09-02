
import React, { useState, createContext, useCallback, useEffect } from 'react'
import { HexColorPicker } from "react-colorful";
import axios from 'axios';
import InputField from '../components/ui/Input/Input';
const color1 = createContext();
let googleid = localStorage.getItem(`google`)

const ProfilePage = props => {

	const [Color, setColor] = useState(localStorage.getItem('color'));
	const [Name, setName] = useState(localStorage.getItem(`name`));
	const setdata = () => {
		let formdata = {
			userId: googleid,
			color: Color,
			name: Name,

		};

localStorage.setItem('color', Color);
		axios({
			method: 'PATCH',
			url: `http://50.18.86.176:8080/user/userInfo`,

			data: formdata
		}).then(response => {

				setColor(reponse.data.color);
		}).catch(err => {
			console.log("failed", err);

		});
	
	}

	return (
		<>
			<main>
				<div className="profile__container">

					<div className="profile__head">
						<div className="profile__head__back">
							<div className="drawer__nav__wrapper__item drawer__nav__wrapper__item--hover typo typo__a u-c-pointer" onClick={() => { props.history.push('/home') }}><span className="typo typo__h u-p-b-xs">&#8592;</span>&nbsp;Home</div>
						</div>
						<div className="profile__head__title typo typo__b">Your Profile</div>
						<div>&nbsp;</div>
					</div>
					<div className="profile__body">
						<div className="profile__input__group">
							<p className="typo typo__b">Name</p>
							<div className="profile__input__wrapper">
								<InputField type={"text"} value={Name} onChange={val => setName(val)} />
							</div>
						</div>
						<div className="profile__input__group">
							<p className="typo typo__b">Color</p>
							<div className="profile__body__colorpicker">
								<HexColorPicker color={Color}
									onChange={(color) => { 
									setColor(color); 
									}} onClick={setdata()} />
							</div>
						</div>
									<button className="profilebtn">Save</button>

					</div>
				</div>
			</main>
		</>
	)
}

export default ProfilePage
export { color1 };


