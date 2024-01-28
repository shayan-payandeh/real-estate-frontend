import http from './httpService';

export function getLocations() {
  return http.get('/location/list').then(({ data }) => data.data);
}

export function getLocationById(id) {
  return http.get(`/location/${id}`).then(({ data }) => data.data);
}

export function addLocation(data) {
  return http.post('/admin/location/add', data).then(({ data }) => data.data);
}

export function updateLocation({ id, data }) {
  return http
    .patch(`/admin/location/update/${id}`, data)
    .then(({ data }) => data.data);
}

export function removeLocation(id) {
  return http
    .delete(`/admin/location/remove/${id}`)
    .then(({ data }) => data.data);
}
