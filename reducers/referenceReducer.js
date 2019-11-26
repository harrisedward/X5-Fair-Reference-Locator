import * as actionTypes from '../actions/actionTypes';

export default (state = [], action) => {
    switch (action.type){
      case actionTypes.CREATE_NEW_REFERENCE:
        return [
          ...state,
          {
            id: action.id,
            ref: action.ref
          }
        ];
      default:
        return state;
    }
  };