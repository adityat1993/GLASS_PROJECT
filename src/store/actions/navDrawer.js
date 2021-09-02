export const TOGGLE_NAV_DRAWER = "TOGGLE_NAV_DRAWER"

export const toggleNavDrawer = (data) => {
	return {
		type: TOGGLE_NAV_DRAWER,
		state: data
	}
}