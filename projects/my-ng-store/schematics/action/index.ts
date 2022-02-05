import {
    Rule,
    apply,
    url,
    applyTemplates,
    move,
    chain,
    mergeWith
} from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';

import { ActionOptions } from './action-options';

export function action(options: ActionOptions): Rule {
    return () => {
        const templateSource = apply(url('./files'), [
            applyTemplates({
                classify: strings.classify,
                dasherize: strings.dasherize,
                name: options.name
            }),
            move(normalize(options.path as string))
        ]);

        return chain([
            mergeWith(templateSource)
        ]);
    };
}