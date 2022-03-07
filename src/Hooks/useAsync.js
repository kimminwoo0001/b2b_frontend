import { useEffect, useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      throw new Error(`useAsync error action type :${action.type}`);
  }
}

export const useAsync = (callback, deps = [], skip = false) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false,
  });

  const fetchData = async () => {
    if (skip) return;
    dispatch({ type: "LOADING" });
    try {
      const data = await callback();
      dispatch({ type: "SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return [state, fetchData];
};
