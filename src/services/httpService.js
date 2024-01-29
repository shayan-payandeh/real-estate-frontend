import axios from 'axios';

const app = axios.create({
  baseURL: 'https://api.hormozganfile.info/',
  withCredentials: true,
});

app.interceptors.request.use(
  (response) => response,
  (err) => Promise.reject(err)
);

// app.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalConfig = err.config;
//     if (err.response.status === 401 && !originalConfig._retry) {
//       originalConfig._retry = true;
//       try {
//         const { data } = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_URL}user/refresh-token`,
//           { withCredentials: true }
//         );
//         if (data) return app(originalConfig);
//       } catch (error) {
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(err);
//   }
// );

const http = {
  get: app.get,
  post: app.post,
  patch: app.patch,
  delete: app.delete,
};

export default http;
