import React, { useEffect } from 'react'

import img1 from '../assets/images/image1.png'
import { useHistory } from "react-router-dom";

const IndexPage = (props) => {
	const history = useHistory();

	useEffect(() => {
		let googleid = localStorage.getItem(`google`)
		if (googleid === null) {
			history.push("/");

		} else {
			history.push('/home');

		}
	}, []);
	return (

		<main>
			<div className="index__container">
				<img src={img1} alt={"Logo"} className="index__image" />
			</div>
		</main>
	)
}

export default IndexPage
