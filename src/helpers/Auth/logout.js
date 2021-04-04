import {store} from "../../store/store";
import * as actionTypes from "../../store/actionTypes";
import {history} from "../history";


export const logout = () => {
    localStorage.removeItem("token");
    store.dispatch({type: actionTypes.LOGOUT});
    history.push('/login');
}