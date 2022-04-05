import { TypedUseSelectorHook, useSelector } from "react-redux";

import { IRootState } from "../context/store";

const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;
export default useTypedSelector;
