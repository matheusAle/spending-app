import { useEffect } from "react";
import { App } from "@/store";
import { useDispatch } from "react-redux";
import { MutationHookOptions, MutationTuple, QueryHookOptions, useMutation as _useMutation } from "@apollo/react-hooks";
import { OperationVariables, QueryResult } from "@apollo/react-common";
import { DocumentNode } from "graphql";

export function useMutation<TData = any, TVariables = OperationVariables>(mutation: DocumentNode, options?: MutationHookOptions<TData, TVariables>): MutationTuple<TData, TVariables> {
  const [mutationFn, mutationState] = _useMutation<TData, TVariables>(mutation, options);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(App.setLoading(mutationState.loading));
  }, [mutationState.loading]);

  return [mutationFn, mutationState];
}
