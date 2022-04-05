import storage from '../Utils/storage'
import {combineReducers} from "redux";
import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    RESET_USER,
    SHOW_ERROR_MSG
} from './action-type'


const initialstate = 'Main Page'
function headTitle(state=initialstate,action) {
      switch (action.type){
          case SET_HEAD_TITLE:
                  return action.data
          default: return state;
      }
}

const iniUser = storage.getUser();
function user(state=iniUser,action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.data
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg
            return {...state, errorMsg} // 在原有数据的基础上扩展数据
        case RESET_USER:
            return {}
        default:
            return state
    }
}

export default combineReducers({
    headTitle,
    user
})