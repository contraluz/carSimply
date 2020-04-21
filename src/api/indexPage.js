import instance from "./index";

// 登录
export const login = function ({
  username,
  password
}) {
  return instance.post(`springBootSwagger/login?username=${username}&password=${password}`)
}

// 用户查询
export const selectAllUser = function ({
  page,
  size
}) {
  return instance.get(`springBootSwagger/selectAllUser/${page}/${size}`)
}

// 用户修改密码
export const updatePassword = function ({
  idUser,
  oldPassword,
  newPassword,
}) {
  return instance.post(`springBootSwagger/updatePassword?idUser=${idUser}&oldPassword=${oldPassword}&newPassword=${newPassword}`)
}

// 权限获取
export const listByMenu = function ({
  roleId

}) {
  return instance.post(`springBootSwagger/listByMenu?roleId=${roleId}`)
}

// 权限修改
export const insertQX = function ({
  roleId,
  menuId
}) {
  return instance.post(`springBootSwagger/insertQX?roleId=${roleId}&menuId=${menuId}`)
}

// ------------------------
// 分页模糊查询客户信息 customer！
export const mapListAccount = function ({
  id,
  code,
  name,
  type,
  page,
  size
}) {
  return instance.get(`springBootSwagger/mapListAccount/${page}/${size}?id=${id}&code=${code}&type=${type}&name=${name}`)
}

export const updateAccount = function ({
  id,
  code,
  name,
  type,
  address,
  ppid,
  pid
}) {
  return instance.get(`springBootSwagger/updateAccount?id=${id}&code=${code}&type=${type}&name=${name}&address=${address}&ppid=${ppid}&pid=${pid}`)
}

// ------------------------

