import request from '@/utils/http/request'

const url = {
  userinfo: '/api/user/get_curr'                         //unsure
}


export const common = {
  getUserInfo: function(parameter){
    return request({
      url: url.userinfo,
      method: 'get',
      params: parameter,
    })
  }


}