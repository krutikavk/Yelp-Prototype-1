export const login = () => {
	return {
        type : 'SIGN_IN'
	} ;
}

export const logout = () => {
	return {
        type : 'SIGN_OUT'
	} ;
}

//incoming field, data ==> infield, payload
export const update = (infield, payload) => {
	console.log(infield)
	console.log(payload)
	return {
		type  : 'UPDATE',
		field : infield,
		payload: payload
	}
}