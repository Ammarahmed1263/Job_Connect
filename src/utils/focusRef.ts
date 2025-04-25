import { RefObject } from "react";

const focusRef = <T extends { focus: () => void }>(ref: RefObject<T>) => {
  ref.current?.focus();
};


export default focusRef;
