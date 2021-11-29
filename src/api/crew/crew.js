import request from '@/utils/request'


export default {
    //组员列表(条件查询分页)
    //当前页 每页记录数 查询对象
    getCrewListPage(pageNum,pageSize,crewQuery) {
        return request({
            url: '/chaoxi/adminSystem/getAllCrewInformationByCondition?pageNum='+pageNum+'&pageSize='+pageSize,
            method: 'post',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
            //teacherQuery对象,把对象转为json传递给接口
            data:crewQuery
          })
    },
    // 逻辑删除
    removeDataById(id) {
        return request({
            url: '/chaoxi/adminSystem/deleteCrewById?id='+id,
            method: 'delete',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
          })
    },
    //添加组员
    addCrew(crew) {
        return request({
            url: '/chaoxi/adminSystem/addCrew',
            method: 'post',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
            data:crew
          })
    },
    //根据id查询
    getCrewInfoById(id) {
        return request({
            url: '/chaoxi/adminSystem/getCrewById?id='+id,
            method: 'get',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            }
          })
    },
    //修改组员
    updateCrew(crew) {
        return request({
            url: '/chaoxi/adminSystem/updateCrew',
            method: 'post',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
            data:crew
        })
    },
    password(password) {
        return request({
            url: '/chaoxi/adminSystem/password='+password,
            method: 'post',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            }
          })
    },
    excelOut() {
        return request({
            url: '/chaoxi/adminSystem/exportExcel',
            method: 'get',
          })
    },
    deleteCrews(crews) {
        return request({
            url: '/chaoxi/adminSystem/deleteCrews',
            method: 'delete',
            headers: {
                'Content-Type':'application/json;charset=UTF-8'
            },
        data:crews
        })
    },

    //二级密码
    isPassword(password) {
        return request({
            url: '/chaoxi/adminSystem/isPassword?password='+password,
            method: 'post'
        })
    },
    updatePassword(password) {
        return request({
            url: '/chaoxi/adminSystem/updatePassword?password='+password,
            method: 'post'
        })
    },

}
