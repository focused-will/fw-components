import { useMemo } from "react";

let id = 0;

export const useUniqueId = () => {
  const uniqueId = useMemo(() => id++, []);
  return uniqueId;
};
