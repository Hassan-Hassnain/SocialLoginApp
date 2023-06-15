/* eslint-disable @typescript-eslint/no-unused-vars */

// import {StyleProp} from 'react-native';
type SingleElement = React.ReactElement;
type Children = React.ReactNode;
interface WithChildren {
  children?: Children;
}

type Ref<T> = React.RefObject<T>;
type ComponentProps<
  T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
> = React.ComponentProps<T>;

type AppTheme = ReactNativePaper.AppTheme;

type WithTheme = {
  theme: AppTheme;
};

type ToCamelCase<S extends string> =
  S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${ToCamelCase<P3>}`
    : Lowercase<S>;

type CamelCase<T> = {
  [K in keyof T as ToCamelCase<string & K>]: T[K] extends {}
    ? CamelCase<T[K]>
    : T[K];
};
