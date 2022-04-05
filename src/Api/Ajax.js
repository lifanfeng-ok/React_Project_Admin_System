import axios from 'axios'
import  { message } from 'antd'

const ajax_request = (url,data={},method='GET') =>{
         return new Promise((resolve, reject)=>{
               let promise;
               if(method === 'GET') {
                   promise = axios.get(url,{
                       params:data
                   })
               } else {
                   promise = axios.post(url,data)
               }
               promise.then((response)=>{
                    resolve(response.data);
               }).catch( error =>{
                     message.error(error);
               })
         })
}

export default ajax_request;