import { useEffect } from "react";
import { App } from "@/store";
import { useDispatch } from "react-redux";
import { useMutation as _useMutation } from "@apollo/react-hooks";

export function useMutation(...args) {
  const [mutationFn, mutationState] = _useMutation(...args);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(App.setLoading(mutationState.loading));
  }, [mutationState.loading]);

  return [mutationFn, mutationState];
}
