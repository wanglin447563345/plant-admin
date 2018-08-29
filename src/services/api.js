import { stringify } from 'qs';
import request from '../utils/request';

// 登录
export async function Login(params) {
  return request(`${window.DATA_URL}/guest/login`, {
    method: 'POST',
    body: params,
  });
}

// 场站列表
export async function plant_list(params) {
  return request(`${window.DATA_URL}/plant/list`, {
    method: 'POST',
    body: params,
  });
}

// 逆变器列表
export async function inverter_list(params) {
  return request(`${window.DATA_URL}/inverter/list`, {
    method: 'POST',
    body: params,
  });
}

// 电表列表
export async function meter_list(params) {
  return request(`${window.DATA_URL}/meter/list`, {
    method: 'POST',
    body: params,
  });
}

// 天气列表
export async function weather_list(params) {
  return request(`${window.DATA_URL}/weather_station/list`, {
    method: 'POST',
    body: params,
  });
}

// 逆变器原始数据
export async function inverter_raw(params) {
  return request(`${window.DATA_URL}/inverter/raw`, {
    method: 'POST',
    body: params,
  });
}

// 电表原始数据
export async function meter_raw(params) {
  return request(`${window.DATA_URL}/meter/raw`, {
    method: 'POST',
    body: params,
  });
}

// 天气原始数据
export async function weather_raw(params) {
  return request(`${window.DATA_URL}/weather_station/raw`, {
    method: 'POST',
    body: params,
  });
}









export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}



export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
