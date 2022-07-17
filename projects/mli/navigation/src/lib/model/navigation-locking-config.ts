import { InjectionToken } from '@angular/core';

export interface NavigationLockingConfig {
    actionsLockingNavigation?: string[];
    actionsUnLockingNavigation?: string[];
}

export const NAVIGATION_LOCKING_CONFIG = new InjectionToken<NavigationLockingConfig>('NAVIGATION_LOCKING_CONFIG');
