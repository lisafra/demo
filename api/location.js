/**
 * Created by Yulia on 2019/7/2.
 */
import Request from '../utils/request'
const http = new Request('qqMap')

/*
 * 根据经纬度获取位置的详细信息
 * */
export const getAreaByLatAndLng = (lat, lng) => {
  return http.post('ws/geocoder/v1', {
    location: `${lat},${lng}`,
    key: 'IW6BZ-QV4RV-FL3PI-U77SK-YENPH-3NBL2'
  })
}

