import axios from '@/libs/api.request'

//字典
export const getAllBaseDict = () => {
    return axios.request({
        method: 'get',
        url: '/dict/all-base'
    })
}

//资产
export const getAsset = (params) => {
    return axios.request({
        method: 'get',
        url: 'asset/list',
        params,
    })
}

export const upsertAsset = (data) => {
    return axios.request({
        method: 'post',
        url: 'asset/upsert',
        data,
    })
}

export const deleteAsset = (data) => {
    return axios.request({
        method: 'post',
        url: 'asset/delete',
        data,
    })
}

//账单
export const getCharge = (params) => {
    return axios.request({
        method: 'get',
        url: 'charge/list',
        params,
    })
}

export const upsertCharge = (data) => {
    return axios.request({
        method: 'post',
        url: 'charge/upsert',
        data,
    })
}

export const deleteCharge = (data) => {
    return axios.request({
        method: 'post',
        url: 'charge/delete',
        data,
    })
}

//定期账单
export const getRegularCharge = (params) => {
    return axios.request({
        method: 'get',
        url: 'regular-charge/list',
        params,
    })
}

export const upsertRegularCharge = (data) => {
    return axios.request({
        method: 'post',
        url: 'regular-charge/upsert',
        data,
    })
}

export const deleteRegularCharge = (data) => {
    return axios.request({
        method: 'post',
        url: 'regular-charge/delete',
        data,
    })
}

//创建分类
export const createDictClass = (data) => {
    return axios.request({
        method: 'post',
        url: 'dict-class/upsert',
        data,
    })
}