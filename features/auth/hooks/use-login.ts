import api from '#/lib/axios-instance';
import { createMutation } from 'react-query-kit';

type Variable = {
  email: string;
  password: string;
};

export const useLogin = createMutation({
  mutationKey: ['/users/login'],
  mutationFn: (data: Variable) => api.post('/users/login', data),
});
