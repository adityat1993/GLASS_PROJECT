import React from 'react'

const InputLabel = props => {
	return (
		<div className="input__label">
			<div className="typo typo__b">{props.title}</div>
			{props.optional ? <div className="typo typo__b typo--gray">&nbsp;Optional</div> : null}
		</div>
	)
}

export default InputLabel