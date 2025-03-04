import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";

export const useAppSelector = useSelector.withTypes<RootState>()