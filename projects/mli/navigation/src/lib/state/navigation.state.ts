import update, { Spec } from 'immutability-helper';

import { MyNgFeatureState, MyNgState } from 'my-ng-store';

export const selectNavigationState = (state: MyNgState): NavigationState =>
  state[NavigationStateSpecification.featureStateKey] as NavigationState;

export const updateNavigationState = (
  state: MyNgState,
  command: Spec<NavigationState, never>
): MyNgState =>
  update(state, {
    [NavigationStateSpecification.featureStateKey]: command,
  });

export interface NavigationState {
  navigationLocked: boolean;
}

@MyNgFeatureState({
  featureStateKey: NavigationStateSpecification.featureStateKey,
  initialState: NavigationStateSpecification.initialState,
})
export class NavigationStateSpecification {
  public static readonly featureStateKey = 'navigation-state';
  public static readonly initialState: NavigationState = {
    navigationLocked: false
  };
}
