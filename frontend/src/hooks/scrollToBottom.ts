"use client";

import { useCallback, RefObject } from "react";

const sleep = (msec: number) =>
  new Promise((resolve) => setTimeout(resolve, msec));

export const useScrollToBottom = (targetEndRef: RefObject<HTMLDivElement>) => {
  const scrollToBottom = useCallback(async () => {
    await sleep(50);
    if (targetEndRef.current) {
      targetEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [targetEndRef]);

  return scrollToBottom;
};
