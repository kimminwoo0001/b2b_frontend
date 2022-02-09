import { useState, useEffect } from "react";

/**
 * @param  initialTabIndex : number
 * @param allTabs [{[key: string]: string | JSX }]
 * @returns [currentTab : JSX, setIndex: Dispatch<SetStateAction<number>> ]
 */

export const useTab = (initialTabIndex, allTabs) => {
  const [index, setIndex] = useState(initialTabIndex);
  const [currentTab, setCurrentTab] = useState(allTabs[initialTabIndex]);

  useEffect(() => {
    setCurrentTab(allTabs[index]);
  }, [index, allTabs]);

  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }

  return { currentIndex: index, currentTab, setIndex };
};
