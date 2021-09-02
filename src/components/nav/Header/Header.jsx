import React from 'react'
import Menu from '../../../iconcomponent/Menu'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { toggleNavDrawer } from '../../../store/actions/navDrawer'
const Header = props => {
	let history = useHistory()


	const dispatch = useDispatch()

	return (
		<div className="header">
		 <div> <p className="header__title typo__logo" onClick={() => { history.push("/home")}}>GLASS</p></div>
		   <div className="header__menubutton" onClick={()=>{dispatch(toggleNavDrawer(true))}}>
			    <Menu className="header__menubutton" />
				</div> 
        </div>
	)
}

export default Header