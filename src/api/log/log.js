import request from '@/utils/request'


export default {
    //组员列表(条件查询分页)
    //当前页 每页记录数 查询对象
    getAllOperationLogByCondition(pageNum,pageSize) {
        return request({
            url: '/chaoxi/adminSystem/getAllOperationLogByCondition?pageNum='+pageNum+'&pageSize='+pageSize,
            method: 'get',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
          })
    },
}