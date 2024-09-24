import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  // TODO: add the token variable
  config.headers.Authorization =
    'Bearer ' + localStorage.getItem('ACCESS_TOKEN');
  return config;
});

// Intercepteur de réponse pour gérer les erreurs globales
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Token has expired. need to refreshing token...');
      try {
        // TODO: add the refresh token variable
        const refreshToken = '';
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh?refresh_token=${refreshToken.replace(
            'Bearer ',
            '',
          )}`,
        );
        if (res.status == 200) {
          // TODO: add the new acces token to the local storage
          // localStorage.setItem('additionnalData',res.data.data.additionnalData)
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        console.log(error);
        // TODO: handle the errror
      }
    }

    return Promise.reject(error);
  },
);

export default api;
