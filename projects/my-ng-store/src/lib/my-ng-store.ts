import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import update from 'immutability-helper';

import { FeatureStateSpecification } from './feature-state-specification';
import { LoggerService } from './logger.service';
import { MyNgState } from './my-ng-state';
import { MyNgAction } from './my-ng-action';
import { MyNgReducer, MY_NG_REDUCER } from './my-ng-reducer';
import { MyNgEffect, MY_NG_EFFECT } from './my-ng-effect';

const featureStateSpecifications: FeatureStateSpecification[] = [];
export const MyNgFeatureState = (specification: FeatureStateSpecification) => {
    return (target: object) => {
        featureStateSpecifications.push(specification);
    }
};

@Injectable({
    providedIn: 'root'
})
export class MyNgStore {
    private readonly _state$ = new BehaviorSubject<MyNgState>({});
    private readonly reducersPerActionType = new Map<string, MyNgReducer[]>();
    private readonly effectsPerActionType = new Map<string, MyNgEffect[]>();
    private readonly actionQueue: MyNgAction[] = [];
    private isProcessingAction = false;

    constructor(
        @Inject(MY_NG_REDUCER) @Optional() reducers: MyNgReducer[],
        @Inject(MY_NG_EFFECT) @Optional() effects: MyNgEffect[],
        private logger: LoggerService) {
        this.logger.information('[MyNgStore] Starting initialization of the store...');

        this.logger.information('[MyNgStore] ---> state initialization...');
        let state = this._state$.getValue();
        state = featureStateSpecifications.reduce(
            (p, c) => update(p, { [c.featureStateKey]: { $set: c.initialState } }),
            state
        );
        this._state$.next(state);

        this.logger.information(`[MyNgStore] ---> initialization of ${(reducers ?? []).length} reducers...`);
        (reducers ?? []).forEach(reducer => {
            this.logger.information('[MyNgStore] ------> initialization of ', reducer);
            reducer.actionTypes.forEach(actionType => {
                const reducers: MyNgReducer[] = this.reducersPerActionType.get(actionType) ?? [];
                if (reducers.length === 0) {
                    this.reducersPerActionType.set(actionType, reducers);
                }

                reducers.push(reducer);
            })
        });

        this.logger.information(`[MyNgStore] ---> initialization of ${(effects ?? []).length} effects...`);
        (effects ?? []).forEach(effect => {
            this.logger.information('[MyNgStore] ------> initialization of ', effect);
            effect.actionTypes.forEach(actionType => {
                const effects: MyNgEffect[] = this.effectsPerActionType.get(actionType) ?? [];
                if (effects.length === 0) {
                    this.effectsPerActionType.set(actionType, effects);
                }

                effects.push(effect);
            })
        });

        this.logger.information('[MyNgStore] The store is initialized.');
    }

    public get state$(): Observable<MyNgState> {
        return this._state$.asObservable();
    }

    public dispatchAction(action: MyNgAction): void {
        this.actionQueue.push(action);
        setTimeout(() => this.processAction());
    }

    private processAction(): void {
        if (this.isProcessingAction) {
            return;
        }

        const action = this.actionQueue.shift();
        if (!action) {
            return;
        }

        this.isProcessingAction = true;

        this.logger.debug('[MyNgStore] Starting processing action', action);

        try {
            const reducers = this.reducersPerActionType.get(action.type) ?? [];
            this.logger.debug(`[MyNgStore] ${reducers.length} reducers found to process the action`);
            const updatedState = reducers.reduce(
                (p, c) => c.update(p, action),
                this._state$.getValue()
            );

            if (updatedState !== this._state$.getValue()) {
                this._state$.next(updatedState);
            }

            const effects = this.effectsPerActionType.get(action.type) ?? [];
            this.logger.debug(`[MyNgStore] ${effects.length} effects found to process the action`);
            effects.forEach(effect => effect.process(this, updatedState, action));
        }
        finally {
            this.isProcessingAction = false;
            setTimeout(() => this.processAction());
        }
    }
}

