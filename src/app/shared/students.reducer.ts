import { Student } from './student.model';
import { ActionReducer, Action } from '@ngrx/store';

export const LOAD_ALBUMS = 'LOAD_ALBUMS';

export interface StudentState {
    collection: Student[];
}

export const initialState: StudentState = {
    collection: [],
};

export const studentreducer: ActionReducer<StudentState> = (state: StudentState = initialState, action: Action) => {
    switch (action.type) {

        case LOAD_ALBUMS:
            return Object.assign({}, state, { collection: action.payload });

        default:
            return state;
    }

};
