import {
  getApi
} from "@/utils/http"

//用户数据
export const userDataApi = () => getApi("/screen/data")

//地图数据
export const mapDataApi = () => getApi("/screen/map")
