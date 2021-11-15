import { extend } from "./utils.js";

const initialState = {
    gender: ``,
};

const ActionType = {
    GENDER_CHANGE: `GENDER_CHANGE`,
};

const ActionCreator = {
    genderChange: (gender) => {
        return {
            type: ActionType.GENDER_CHANGE,
            payload: gender
        };
    },
};

const Operation = {
    loadName: (name) => (dispatch, getState, api) => {
        return api.get(`api.genderize.io?name=${name}`)
            .then((data) => {
                if (data.data.name === 'undefined') {
                    dispatch(ActionCreator.genderChange(''));
                } else {
                    dispatch(ActionCreator.genderChange(data.data.gender));
                }
            });
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.GENDER_CHANGE:
            return extend(state, { gender: action.payload });
        default:
            return state;
    }
};

export {
    ActionCreator,
    Operation,
    reducer,
};
