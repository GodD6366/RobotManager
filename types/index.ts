export type Partiall<T> = { [P in keyof T]?: T[P] };
