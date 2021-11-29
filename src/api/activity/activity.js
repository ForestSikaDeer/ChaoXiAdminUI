import request from '@/utils/request'


export default {
    //查询所有组员活动记录
    getAllCrewActivityMessage() {
        return request({
            url: '/chaoxi/adminSystem/getAllCrewActivityMessage',
            method: 'get',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
          })
    },
    getCrewActivityMessageByName(name,level) {
        return request({
            url: '/chaoxi/adminSystem/getCrewActivityMessageByName&crewName='+name+'&crewLevel='+level,
            method: 'post',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
          })
    },
    getActivityMessageById(id) {
        return request({
            url: '/chaoxi/adminSystem/getActivityMessageById?id='+id,
            method: 'get',
          })
    },
    updateActivity(activity) {
        return request({
            url: '/chaoxi/adminSystem/updateActivity',
            method: 'post',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
            data:activity
        })
    },
}