import { RefObject } from "react";

const focusRef = <T extends { focus: () => void }>(ref: RefObject<T | null>) => {
  if (ref.current) {
    ref.current.focus();
  }
};

export default focusRef;
