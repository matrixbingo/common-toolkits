declare module '*.css';
declare module '*.less';

declare module 'isjsonobj' {
    export default function isJSONObj(obj: any): boolean;
}

declare module '@stdlib/assert-is-json' {
    export default function isJSON(value: any): boolean;
}

