import * as actionTypes from './actionTypes'

export const addReference = (ref) => ({
	ref,
	type: actionTypes.CREATE_NEW_REFERENCE,
})