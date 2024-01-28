import http from './httpService';

export function getApplicantTypes() {
  return http.get('/applicantType/list').then(({ data }) => data.data);
}

export function getApplicantTypeById(id) {
  return http.get(`/applicantType/${id}`).then(({ data }) => data.data);
}

export function addApplicantType(data) {
  return http
    .post('/admin/applicantType/add', data)
    .then(({ data }) => data.data);
}

export function updateApplicantType({ id, data }) {
  return http
    .patch(`/admin/applicantType/update/${id}`, data)
    .then(({ data }) => data.data);
}

export function removeApplicantType(id) {
  return http
    .delete(`/admin/applicantType/remove/${id}`)
    .then(({ data }) => data.data);
}
