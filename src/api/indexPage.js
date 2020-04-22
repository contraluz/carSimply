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
// product
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

export const insertAccount = function ({
  id,
  code,
  name,
  type,
  address,
  ppid,
  pid
}) {
  return instance.post(`springBootSwagger/insertAccount?id=${id}&code=${code}&type=${type}&name=${name}&address=${address}&ppid=${ppid}&pid=${pid}`)
}
export const listProduct = function () {
  return instance.get(`springBootSwagger/listProduct`)
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
  return instance.post(`springBootSwagger/updateAccount?id=${id}&code=${code}&type=${type}&name=${name}&address=${address}&ppid=${ppid}&pid=${pid}`)
}

export const deleteAccount = function ({ id }) {
  return instance.post(`springBootSwagger/deleteAccount?id=${id}`)
}

// ------------------------

// 分页模糊查询客户信息 customer！
export const mapListProduct = function ({
  id,
  typen,
  typew,
  page,
  size
}) {
  return instance.get(`springBootSwagger/mapListProduct/${page}/${size}?id=${id}&typen=${typen}&typew=${typew}`)
}

export const insertProduct = function ({
  id,
  typen,
  typew,
  num,
  ppid
}) {
  return instance.post(`springBootSwagger/insertProduct?id=${id}&typen=${typen}&typew=${typew}&num=${num}&ppid=${ppid}`)
}
export const listPricing = function () {
  return instance.get(`springBootSwagger/listPricing`)
}

export const updateProduct = function ({
  id,
  typen,
  typew,
  num,
  ppid
}) {
  return instance.post(`springBootSwagger/updateProduct?id=${id}&typen=${typen}&typew=${typew}&num=${num}&ppid=${ppid}`)
}

export const deleteProduct = function ({ id }) {
  return instance.post(`springBootSwagger/deleteProduct?id=${id}`)
}

// ------------------------
export const mapListPricing = function ({
  type,
  page,
  size
}) {
  return instance.get(`springBootSwagger/mapListPricing/${page}/${size}?type=${type}`)
}

export const insertPricing = function ({
  type,
  price
}) {
  return instance.post(`springBootSwagger/insertPricing?type=${type}&price=${price}`)
}
export const updatePricing = function ({
  id,
  type,
  price
}) {
  return instance.post(`springBootSwagger/updatePricing?id=${id}&type=${type}&price=${price}`)
}

export const deletePricing = function ({ id }) {
  return instance.post(`springBootSwagger/deletePricing?id=${id}`)
}

// ------------------------
// 报价管理
export const listQuoteByUserId = function () {
  return instance.get(`springBootSwagger/listQuoteByUserId`)
}
export const listQuoteByAccountId = function () {
  return instance.get(`springBootSwagger/listQuoteByAccountId`)
}
export const mapListQuote = function ({
  name,
  typen,
  typew,
  page,
  size
}) {
  return instance.get(`springBootSwagger/mapListQuote/${page}/${size}?name=${name}&typen=${typen}&typew=${typew}`)
}

export const insertQuote = function ({
  uid,
  aid,
  price
}) {
  return instance.post(`springBootSwagger/insertQuote?aid=${aid}&price=${price}&uid=${uid}`)
}
export const updateQuote = function ({
  id,
  uid,
  aid,
  price
}) {
  return instance.post(`springBootSwagger/updateQuote?id=${id}&uid=${uid}&aid=${aid}&price=${price}`)
}

export const deleteQuote = function ({ id }) {
  return instance.post(`springBootSwagger/deleteQuote?id=${id}`)
}

// ------------------------
// 合同管理

export const mapListContract = function ({
  name,
  mode,
  payment,
  page,
  size
}) {
  return instance.get(`springBootSwagger/mapListContract/${page}/${size}?name=${name}&mode=${mode}&payment=${payment}`)
}

export const insertContract = function ({
  uid,
  aid,
  tax,
  mode,
  payment
}) {
  return instance.post(`springBootSwagger/insertContract?aid=${aid}&tax=${tax}&uid=${uid}&mode=${mode}&payment=${payment}`)
}

export const updateContract = function ({
  id,
  uid,
  aid,
  tax,
  mode,
  payment,
  appointment
}) {
  return instance.post(`springBootSwagger/updateContract?id=${id}&uid=${uid}&aid=${aid}&tax=${tax}&mode=${mode}&payment=${payment}&appointment=${appointment}`)
}

export const deleteContract = function ({ id }) {
  return instance.post(`springBootSwagger/deleteContract?id=${id}`)
}
// ------------------------
// 审批管理
export const mapShenPi = function ({
  id,
  page,
  size
}) {
  return instance.get(`springBootSwagger/mapShenPi/${page}/${size}?id=${id}`)
}

export const mapListXinXi = function ({
  cqid,
  type
}) {
  return instance.get(`springBootSwagger/mapListXinXi?type=${type}&cqid=${cqid}`)
}

export const listAllByCount = function ({
  id
}) {
  return instance.get(`springBootSwagger/listAllByCount?id=${id}`)
}

export const updateShenPi = function ({
  id,
  cqid,
  remake,
  type
}) {
  return instance.get(`springBootSwagger/updateShenPi?id=${id}&cqid=${cqid}&remake=${remake}&type=${type}`)
}


