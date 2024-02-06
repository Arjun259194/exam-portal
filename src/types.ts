import React from "react";

export type FnFormAction = (arg1: FormData) => Promise<void>

export type Options = [string, string, string, string]

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};




export type ClassName = string | undefined