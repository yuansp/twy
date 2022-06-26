import service from '@/utils/request'

export function getMetadata() {
  return service({
    url: '/com.primeton.eos.managerProject.businsessInfo.enginee.impl.BusinessInfo.getBusinessInfo.biz.ext',
    method: 'post'
  })
}
export function savedata(data) {
  return service({
    url: '/com.primeton.eos.managerProject.businsessInfo.enginee.impl.BusinessInfo.insertBusinessInfo.biz.ext',
    method: 'post',
    data: data
  })
}
export function updatedata(data) {
  return service({
    url: '/com.primeton.eos.managerProject.businsessInfo.enginee.impl.BusinessInfo.updateBusinessInfo.biz.ext',
    method: 'post',
    data: data
  })
}
export function deldata(data) {
  return service({
    url: '/com.primeton.eos.managerProject.businsessInfo.enginee.impl.BusinessInfo.deleteBusinessInfo.biz.ext',
    method: 'post',
    data: data
  })
}
