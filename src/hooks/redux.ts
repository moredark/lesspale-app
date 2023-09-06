import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootStore } from "../stores";

export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;
