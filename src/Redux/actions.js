import {RECEIVE_USER, RESET_USER, SET_HEAD_TITLE, SHOW_ERROR_MSG} from "./action-type";
import storage from "../Utils/storage";
import {login_request} from "../Api/Ajax_list";


export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE, data: headTitle})

export const receiveUser = (user) => ({type: RECEIVE_USER, data: user})

/*
退出登陆的同步action
 */
export const logout = () => {
    // 删除local中的user
    storage.removeUser()
    // 返回action对象
    return {type: RESET_USER}
}

/*
显示错误信息同步action
 */
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg});

export const login = (username, password) => {
    return async dispatch => {
        // 1. 执行异步的ajax 请求
        const result = await login_request(username, password)
        // 可能返回结果
        // {status: 0, data: user} {status: 1, msg: 'xxx'}
        if(result.status === 0) { // 2.1. 如果成功, 分发成功的同步action
            const user = result.data
            // 保存到local中
            storage.saveUser(user)
            // 分发接收用户的同步action
            dispatch(receiveUser(user))
        } else { // 2.2. 如果失败, 分发失败的同步action
            const msg = result.msg
            dispatch(showErrorMsg(msg))
        }
    }
}