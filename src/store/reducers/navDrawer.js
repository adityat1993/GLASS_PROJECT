import { TOGGLE_NAV_DRAWER } from "../actions/navDrawer";

const initalState = {
	navDrawer: false
}

const handleData = (state = initalState, action) => {
	switch (action.type) {
		case TOGGLE_NAV_DRAWER:
			return {
				...state,
				navDrawer: action.state
			};
		default:
			break
	}
	return state
}

export default handleData