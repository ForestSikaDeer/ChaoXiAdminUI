import request from '@/utils/request'


export default {
    getAllVideos() {
        return request({
            url: '/chaoxi/videoSystem/getAllVideos',
            method: 'get',
          })
    },
}
