import update, { Spec } from 'immutability-helper';

import { MyNgFeatureState, MyNgState } from 'my-ng-store';

import { Todo } from '../model';

export const selectTodoState = (state: MyNgState): TodoState =>
    state[TodoStateSpecification.featureStateKey] as TodoState;

export const updateTodoState = (state: MyNgState, command: Spec<TodoState, never>): MyNgState =>
    update(
        state,
        {
            [TodoStateSpecification.featureStateKey]: command
        }
    );

export interface TodoState {
    todoList: Todo[];
}

@MyNgFeatureState({
    featureStateKey: TodoStateSpecification.featureStateKey,
    initialState: TodoStateSpecification.initialState
})
export class TodoStateSpecification {
    public static readonly featureStateKey = 'todo-state';
    public static readonly initialState: TodoState = {
        todoList: []
    };
}
