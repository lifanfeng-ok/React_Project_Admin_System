import ajax from './Ajax';
import {message} from "antd";
import jsonp from "jsonp";

const BASE = 'http://localhost:3000/api3'

export const login_request = (username,password) =>{
      return ajax(`${BASE}/login`,{username,password},'POST')
}

export const req_weather =(cityid) =>{

         let url2 = `http://localhost:3000/api2/weather/v1/?district_id=${cityid}&data_type=all&ak=luFlr9HEOB06pWeWAwCvev6b7AHINdLw`
         // return new Promise((resolve,reject)=>{
         //      jsonp(url2, {
         //          params: 'callback'
         //      }, (error, data) => {
         //           console.log(data);
         //          if(!error && data.message === 'success') {
         //              const {text} = data.result.now
         //              resolve({weather:text})
         //          } else {
         //              message.error('获取天气信息失败!')
         //          }
         //      })
         //  })
         return ajax(url2,{},'GET')
}

export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', {parentId})

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')

// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')

export const reqProducts = ({pageNum, pageSize}) => ajax(BASE + '/manage/product/list', {pageNum, pageSize})

export const reqSearchProducts = ({pageNum, pageSize, searchType, searchName}) => ajax(BASE + '/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName,
})

export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', {categoryId})

export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {productId, status}, 'POST')

export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete', {name}, 'POST')


export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST')

export const reqRoles = () => ajax(BASE + '/manage/role/list')

export const reqAddRole = (roleName) => ajax(BASE + '/manage/role/add', {roleName}, 'POST')

export const reqUpdateRole = (role) => ajax(BASE + '/manage/role/update', role, 'POST')


export const reqUsers = () => ajax(BASE + '/manage/user/list')

export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete', {userId}, 'POST')

export const reqAddOrUpdateUser = (user) => ajax(BASE + '/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')
