import React from 'react'

const InputField = props => {
	return (
		<input value={props.value} onChange={e => props.onChange(e.target.value)} type={props.type} className="input input__field typo typo__b" placeholder={props.placeholder ? props.placeholder : null} />
	)
}

export default InputField