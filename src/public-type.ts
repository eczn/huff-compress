/**
 * 这是一种泛型，用来给出 Elem 代表的权
 */
export type GetPriority<Elem> = (a: Elem) => number;
