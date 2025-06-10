import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Filters } from "@type/filterTypes";
import { ForwardedRef } from "react";

const applyAndDismissFilters = (
  data: Filters,
  ref: ForwardedRef<BottomSheetModal>,
  setFilters: (newFilters: Partial<Filters>) => void
) => {
  const processedData: Partial<Filters> = {};
  Object.keys(data).forEach((key) => {
    const k = key as keyof Filters;
    if (data[k] === "") {
      processedData[k] = "";
    } else if (data[k] !== undefined) {
      // @ts-ignore
      processedData[k] = data[k];
    } else {
      processedData[k] = undefined;
    }
  });
  setFilters(processedData);
  if (typeof ref !== "function" && ref && ref.current) {
    ref.current.dismiss();
  }
};

export default applyAndDismissFilters;
