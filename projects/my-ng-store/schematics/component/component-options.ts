export interface ComponentOptions {
    name: string;
    path?: string;
    project?: string;
    displayBlock?: boolean;
    inlineStyle?: boolean;
    inlineTemplate?: boolean;
    viewEncapsulation?: string;
    changeDetection?: string;
    prefix?: string;
    style?: string;
    type?: string;
    skipTests?: boolean;
    flat?: boolean;
    skipImport?: boolean;
    selector?: string;
    skipSelector?: string;
    module?: string;
    export?: boolean;
}
