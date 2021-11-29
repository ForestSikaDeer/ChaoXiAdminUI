import request from '@/utils/request'


export default {
    //查询所有角色
    getAllUsers() {
        return request({
            url: '/chaoxi/adminSystem/getAllUsers',
            method: 'get',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            }
          })
    },
    getUserListPage(pageNum,pageSize,userQuery) {
        return request({
            url: '/chaoxi/adminSystem/getAllUserInformationByCondition?pageNum='+pageNum+'&pageSize='+pageSize,
            method: 'post',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
            //teacherQuery对象,把对象转为json传递给接口
            data:userQuery
          })
    },
    UserEmpowerment(id) {
        return request({
            url: '/chaoxi/adminSystem/UserEmpowerment?id='+id,
            method: 'post',
          })
    },
    UserDisableEmpowerment(id) {
        return request({
            url: '/chaoxi/adminSystem/UserDisableEmpowerment?id='+id,
            method: 'post',
          })
    },
    userEnable(id) {
        return request({
            url: '/chaoxi/adminSystem/userEnable?id='+id,
            method: 'post',

          })
    },
    userDisable(id) {
        return request({
            url: '/chaoxi/adminSystem/userDisable?id='+id,
            method: 'post',
          })
    },
}