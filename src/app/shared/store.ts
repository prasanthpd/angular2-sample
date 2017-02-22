import * as fromStudents from './students.reducer';
import { StudentState } from './students.reducer';
import * as fromOperation from './operation.reducer';
import { OperationState } from './operation.reducer';

export interface AppState {
    students: StudentState;
    operation:OperationState;
}


export const initialState: AppState = {
    students: fromStudents.initialState,
    operation: fromOperation.initialState
};


export const reducer = {
    students: fromStudents.studentreducer,
    operation: fromOperation.operationreducer,
};

