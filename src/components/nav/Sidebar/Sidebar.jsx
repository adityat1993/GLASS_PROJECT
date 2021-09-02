import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import UserController from '../../../../src/pages/Controller/User'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from "../../hoc/Backdrop/Backdrop"

import { toggleNavDrawer } from "../../../store/actions/navDrawer"
import Menu from '../../../../src/iconcomponent/Menu'
import { useContext } from "react";
toast.configure()
const Sidebar = (props) => {

	let history = useHistory()

	const dispatch = useDispatch()

	const navDrawerState = useSelector(state => state.navDrawerState).navDrawer
    const mystyle = {
		marginBottom: "250px"

	}  

	const signout = () => {

		let googleid = localStorage.getItem(`google`)
		let formdata = {
			userId: googleid
		}
		UserController.userSignOut(formdata, (result) => {

			console.log("result userSignOut", result);
		

			localStorage.removeItem("userName");

			localStorage.removeItem(`google`);
		 	localStorage.clear();

			history.push('/signout');

		});
		


	}

	const getSideBarItems = () => {
		let username = localStorage.getItem(`name`)
		if (history.location.pathname.includes('/home'))
			return (

				[
					<div className="sidebar__list">
						<li className="sidebar__list__item" style={{marginBottom : '50px'}} ></li>
						<li className="sidebar__list__item typo typo__b u-c-default" style={{ color: "#C9C9C9" }}>Hi, {username}</li>
					</div>,
				<div className="sidebar__list" style={mystyle}>
					<li className="sidebar__list__item typoe typo__b">Shop</li>
                	<li className="sidebar__list__item typoe typo__b" onClick={() => { history.push("/home/profile"); dispatch(toggleNavDrawer(false)); }}>Profile</li>
					</div>,
										<div className="sidebar__list" style={{marginBottom : "40px"}}>

											<li className="sidebar__list__item typoe typo__b"  onClick={() => { signout(); dispatch(toggleNavDrawer(false)); }}>Sign Out</li>
</div>,
					<div className="sidebar__list">
						<li className="sidebar__list__item typoi typo__b typo__b--2" onClick={() => { window.open("https://this.glass/contact", "_blank"); dispatch(toggleNavDrawer(false)); }}>CONTACT</li>
						<li className="sidebar__list__item typoi typo__b typo__b--2" onClick={() => { window.open("https://this.glass/policy", "_blank"); dispatch(toggleNavDrawer(false)); }}>POLICY</li>
						<li className="sidebar__list__item typoi typo__b typo__b--2" onClick={() => { window.open("https://this.glass/about", "_blank"); dispatch(toggleNavDrawer(false)); }}>ABOUT</li>

					</div>
				]
			) 
		else return (
			[
				<div className="sidebar__list">
                    <li className="sidebar__list__item" style={{marginBottom : '50px'}}></li>
					<li className="sidebar__list__item typo typo__b u-c-default" style={{ color: "#C9C9C9" }}>Hello</li>
					<li className="sidebar__list__item typo typo__b">Shop</li>
				</div>,
				<div className="sidebar__list">
					<li className="sidebar__list__item typo typo__b" onClick={() => { history.push("/login"); dispatch(toggleNavDrawer(false)); }}>Sign In</li>
					<li className="sidebar__list__item typo typo__b" onClick={() => { history.push("/signup"); dispatch(toggleNavDrawer(false)); }}>Sign Up</li>
				</div>,
				<div className="sidebar__list">
					<li className="sidebar__list__item typo typo__b typo__b--2" onClick={() => { window.open("https://this.glass/contact", "_blank"); dispatch(toggleNavDrawer(false)); }}>CONTACT</li>
					<li className="sidebar__list__item typo typo__b typo__b--2" onClick={() => { window.open("https://this.glass/policy", "_blank"); dispatch(toggleNavDrawer(false)); }}>POLICY</li>
					<li className="sidebar__list__item typo typo__b typo__b--2" onClick={() => { window.open("https://this.glass/about", "_blank"); dispatch(toggleNavDrawer(false)); }}>ABOUT</li>
				</div>
			]
		)
	}

	return (
		<Backdrop show={navDrawerState} onClick={() => { dispatch(toggleNavDrawer(false)) }}>
			<div className={navDrawerState ? "sidebar sidebar--active" : "sidebar"}>
				{getSideBarItems()}
			</div>
		</Backdrop>
	);
};

export default Sidebar;
