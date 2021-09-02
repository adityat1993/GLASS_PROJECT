import React, { useEffect } from 'react'

import Drawer from '../components/nav/Drawer/Drawer'

import img1 from '../assets/images/image1.png'
const HomePage = props => {


	return (

		<main>
			<Drawer history={props.history} />
			<div className="home__container">
				<div className="home__container__content"><img src={img1} alt={"Logo"} className="index__image" /></div>
			</div>
		</main>
	)
}

export default HomePage