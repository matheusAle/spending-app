import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

const { Types, Creators } = createActions({
    show: ['show'],
}, {
    prefix: 'SpendingForm/'
});

const INITIAL_STATE = Immutable({
    show: false,
});

export const SpendingFormReducer = createReducer(INITIAL_STATE, {
    [Types.SHOW]: (state, { show }) => state.merge({ show }),
});

export const SpendingForm = Creators;
