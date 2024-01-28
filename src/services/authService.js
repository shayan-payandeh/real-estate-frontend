import http from './httpService';

export function login(data) {
  return http.post('/user/login', data).then(({ data }) => data.data);
}

export function getProfile() {
  return http.get('/user/profile').then(({ data }) => data);
}

export function logout() {
  return http.post('/user/logout').then(({ data }) => data.data);
}

export function getAllUsers() {
  return http.get('/admin/user/list').then(({ data }) => data.data);
}
