import http from './httpService';

export function getTypes() {
  return http.get('/type/list').then(({ data }) => data.data);
}

export function getTypeById(id) {
  return http.get(`/type/${id}`).then(({ data }) => data.data);
}

export function addType(data) {
  return http.post('/admin/type/add', data).then(({ data }) => data.data);
}

export function updateType({ id, data }) {
  return http
    .patch(`/admin/type/update/${id}`, data)
    .then(({ data }) => data.data);
}

export function removeType(id) {
  return http.delete(`/admin/type/remove/${id}`).then(({ data }) => data.data);
}
