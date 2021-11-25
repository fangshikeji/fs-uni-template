import http from '@/utils/http'

const baseUrl = 'basic/v4/enterprise/org'

export function getOrgList(data) {
  // return http.get(`${baseUrl}/list`, data)
	return new Promise(resolove => {
		resolove({"data":{"results":[{"id":36,"name":"名师科技","son":[{"id":37,"name":"org1","staffs":[],"son":[{"id":49,"name":"test223","staffs":[],"son":null}]},{"id":50,"name":"dfdfdfdfdsf忒耳机飞飞机的","staffs":[],"son":null}],"staffs":[{"id":161,"name":"名师科技管理员","gender":null,"phone":"18734826752","enterpriseId":58,"tenantId":"2a7d62c4d0a04c96924146afbb7541da","idCard":null,"position":null,"deleteDate":null,"enterDate":null,"icon":null,"userId":"60d405c63aaf4ff0817dd66086fa9c32","orgId":36,"state":3,"version":0},{"id":162,"name":"test1","gender":null,"phone":"18734821111","enterpriseId":58,"tenantId":"2a7d62c4d0a04c96924146afbb7541da","idCard":null,"position":null,"deleteDate":null,"enterDate":"2021-08-09","icon":null,"userId":"83b160df787c4aa09a0f39fc28f96b6e","orgId":36,"state":3,"version":0},{"id":167,"name":"测试人员2","gender":null,"phone":"18834821742","enterpriseId":58,"tenantId":"2a7d62c4d0a04c96924146afbb7541da","idCard":null,"position":null,"deleteDate":null,"enterDate":"2021-08-13","icon":null,"userId":"3e2f29fcfd2e49bd8916bb3de0709e6f","orgId":36,"state":3,"version":0}]}],"totalCount":4,"pageNo":0},"success":true,"msg":""})
	})
}
export function addOrg(data) {
  return http.post(baseUrl, data)
}
export function editOrg(data) {
  return http.put(baseUrl, data)
}
export function delOrg(id) {
  return http.del(`${baseUrl}/${id}`)
}
export function transferAdmin(data) {
  return http.put('basic/v4/enterprise/admin/transfer', data)
}

const baseUrl1 = 'basic/v4/staff'
export function addStaff(data) {
  return http.post(baseUrl1, data)
}
export function editStaff(data) {
  return http.put(baseUrl1, data)
}
export function delStaff(id) {
  return http.del(`${baseUrl1}/${id}`)
}