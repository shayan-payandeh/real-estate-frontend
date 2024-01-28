import http from './httpService';

export function getPropertyRequests(query) {
  return http
    .get(`/propertyRequest/list?${query}`)
    .then(({ data }) => data.data);
}

export function getPropertyRequestById(id) {
  return http.get(`/propertyRequest/${id}`).then(({ data }) => data.data);
}

export function addPropertyRequest(data) {
  return http
    .post('/propertyRequest/add', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(({ data }) => data.data);
}

export function updatePropertyRequest({ id, data }) {
  return http
    .patch(`/admin/propertyRequest/update/${id}`, data)
    .then(({ data }) => data.data);
}

export function removePropertyRequest(id) {
  return http
    .delete(`/admin/propertyRequest/remove/${id}`)
    .then(({ data }) => data.data);
}
