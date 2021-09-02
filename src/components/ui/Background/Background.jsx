import React from 'react'
import { useEffect } from 'react'
import UserController from '../../../../src/pages/Controller/User'

const Background = props => {

	useEffect(() => {
		setTimeout(() => {
			props.history.push('/home');

		}, 2000)
	})

	return (
		<div className="background__text typo typo__b">
			{props.text}
		</div>
	)
}

export default Background