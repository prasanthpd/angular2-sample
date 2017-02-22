import { ActionReducer, Action } from '@ngrx/store';

export const START_SIGNIN = 'START_SIGNIN';
export const END_SIGNIN = 'END_SIGNIN';
export const END_STUDENTSLOAD = 'END_ALBUMLOAD';

export const SEARCH_ACTION = 'SEARCH_ACTION';
export const LOAD_ACTION = 'LOAD_ACTION';

export interface OperationState {
    startSignIn: boolean;
    endSignIn: boolean;
    engLoadStudents: boolean;
    searchAction: boolean;
    loadAction: boolean
}

export const initialState: OperationState = {
    startSignIn: false,
    endSignIn: false,
    engLoadStudents: false,
    searchAction: false,
    loadAction: false
};

export const operationreducer: ActionReducer<OperationState> = (state: OperationState = initialState, action: Action) => {
    switch (action.type) {

        case START_SIGNIN:
            return Object.assign({}, state, {startSignIn: true, endSignIn:false});

        case END_SIGNIN:
            return Object.assign({}, state, {startSignIn: false, endSignIn:true});

        case SEARCH_ACTION:
            return Object.assign({}, state, {searchAction: true, loadAction: false});     

        case LOAD_ACTION:
            return Object.assign({}, state, {loadAction: true, searchAction: false});                     
     
        default:
            return state;
    }
};
