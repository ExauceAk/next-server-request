import {
  MutateOptions,
  UseMutateAsyncFunction,
  UseMutateFunction,
} from "@tanstack/react-query";

type ExtractMutateOptions<T> =
  T extends MutateOptions<
    infer TData,
    infer TError,
    infer TVariables,
    infer TContext
  >
    ? [TData, TError, TVariables, TContext]
    : never;

/**
 * Mutate function without variables
 */
export type MutateFunctionWithoutVariables<
  TOptions extends MutateOptions<any, any, any, any>,
> = (
  options?: TOptions,
) => ReturnType<
  UseMutateFunction<
    ExtractMutateOptions<TOptions>[0],
    ExtractMutateOptions<TOptions>[1],
    ExtractMutateOptions<TOptions>[2],
    ExtractMutateOptions<TOptions>[3]
  >
>;

/**
 * Mutate async function without variables
 */
export type MutateAsyncFunctionWithoutVariables<
  TOptions extends MutateOptions<any, any, any, any>,
> = (
  options?: TOptions,
) => ReturnType<
  UseMutateAsyncFunction<
    ExtractMutateOptions<TOptions>[0],
    ExtractMutateOptions<TOptions>[1],
    ExtractMutateOptions<TOptions>[2],
    ExtractMutateOptions<TOptions>[3]
  >
>;
