import request from '@/utils/request'


export default {
    getMonitorInfo() {
        return request({
            url: '/chaoxi/adminSystem/getMonitorInfo',
            method: 'get',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
          })
    },
    
}