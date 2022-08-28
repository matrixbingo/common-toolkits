declare module '*.css';
declare module '*.less';

declare module 'deep-equal' {
    export default function deepEqual(a: any, b: any, options?: object): boolean;
}

