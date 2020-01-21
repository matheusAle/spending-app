import { useEffect } from "react";
import { App } from "@/store";
import { useDispatch } from "react-redux";
import { useQuery as _useQuery } from "@apollo/react-hooks";

export function useQuery(...args) {
  const query = _useQuery(...args);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(App.setLoading(query.loading));
  }, [query.loading]);

  return query;
}
