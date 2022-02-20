import { useState } from "react";

/**
 * @param  initialTabIndex : number
 * @param allTabs [{[key: string]: string | JSX }]
 * @returns [currentTab : JSX, setIndex: Dispatch<SetStateAction<number>> ]
 */

export const useTab = (initialTabIndex, allTabs) => {
  const [index, setIndex] = useState(initialTabIndex);

  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }

  return { currentIndex: index, currentTab: allTabs[index], setIndex };
};
