import React from 'react'

const Backdrop = props => {

	const dummy = () => { }

	return (
		<div className={props.show ? "backdrop backdrop--active" : "backdrop"} onClick={props.onClick ? props.onClick : dummy}>
			{props.children}
		</div>
	)
}

export default Backdrop