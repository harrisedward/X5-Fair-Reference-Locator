import * as actionTypes from './actionTypes'

let referenceId = 0
export const addReference = (ref) => {
	return {
		type: actionTypes.CREATE_NEW_REFERENCE,
		id: referenceId ++,
		ref
	}
}