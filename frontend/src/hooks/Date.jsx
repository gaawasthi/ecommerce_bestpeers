import { useMemo } from "react";

export default function useFormattedDate(isoDate) {
  return useMemo(() => {
    if (!isoDate) return "";

    const d = new Date(isoDate);

    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  }, [isoDate]);
}
