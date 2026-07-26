export type KeyedObject<
  V = any, // force formatting
  K extends string | number | symbol = string,
> = {
  [key in K]: V;
};

export type Nullable<T> = T | null;

export type Nullish<T> = Nullable<T> | undefined;

export type ValueOf<T> = T[keyof T];

export type FixedLengthArray<T, L extends number> = [T, ...T[]] & { length: L };
