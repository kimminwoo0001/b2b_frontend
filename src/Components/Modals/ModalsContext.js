import { createContext } from "react";

// 모달 열고 닫기
export const ModalsDispatchCointext = createContext({
  open: () => {},
  close: () => {},
});

// 보여줄 모달 리스트
export const ModalsStateContext = createContext([]);
