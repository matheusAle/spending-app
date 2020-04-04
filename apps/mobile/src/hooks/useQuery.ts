import { useEffect } from "react";
import { App } from "@/store";
import { useDispatch } from "react-redux";
import { QueryHookOptions, useQuery as _useQuery } from "@apollo/react-hooks";
import { OperationVariables, QueryResult } from "@apollo/react-common";
import { DocumentNode } from "graphql";

export function useQuery<TData = any, TVariables = OperationVariables>(query: DocumentNode, options?: QueryHookOptions<TData, TVariables>): QueryResult<TData, TVariables> {
  const queryData = _useQuery(query, options);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(App.setLoading(queryData.loading));
  }, [queryData.loading]);

  return queryData;
}
