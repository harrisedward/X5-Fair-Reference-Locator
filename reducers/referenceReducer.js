import * as actionTypes from '../actions/actionTypes';

export const initialReferencesState = {
  references: []
}

export default (state = initialReferencesState, action = null) => {
    switch (action.type) {
      case actionTypes.CREATE_NEW_REFERENCE: {
        const { ref } = action
        return { ...state, references: state.references.concat(ref) }
      }

      default: {
        return state;
      }
    }
  };