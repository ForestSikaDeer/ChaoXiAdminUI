import request from '@/utils/request'


export default {
    //查询公告
    getNoticeList(pageNum,pageSize,notice) {
        return request({
            url: '/chaoxi/adminSystem/getAllNoticeInformationByCondition?pageNum='+pageNum+'&pageSize='+pageSize,
            method: 'post',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
            data:notice
          })
    },
    removeNoticeById(id) {
        return request({
            url: '/chaoxi/adminSystem/deleteNoticeById?id='+id,
            method: 'delete',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
          })
    },
    deleteNotices(notices) {
        return request({
            url: '/chaoxi/adminSystem/deleteNotices',
            method: 'delete',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
            data:notices
          })
    },
    updateNotice(notice) {
        return request({
            url: '/chaoxi/adminSystem/updateNotice',
            method: 'post',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
            data:notice
          })
    },
    addCrew(notice) {
        return request({
            url: '/chaoxi/adminSystem/addNotice',
            method: 'post',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
            data:notice
          })
    },
    getAllNotice() {
        return request({
            url: '/chaoxi/adminSystem/getAllNotice',
            method: 'get',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            }
          })
    },
    getNoticeInfoById(id) {
        return request({
            url: '/chaoxi/adminSystem/getNoticeById?id='+id,
            method: 'get',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            }
          })
    },
    up(file) {
        return request({
            url: '/edu-Avatar/uploadOssAvatar',
            method: 'post',
            data:file
          })
    },
    updateNotice(notice) {
        return request({
            url: '/chaoxi/adminSystem/updateNotice',
            method: 'post',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
            data:notice
          })
    },

}