import api from '#/lib/axios-instance'
import { createMutation } from 'react-query-kit'

type Variable = {
    password: string,
    confirmPassword: string,
    token: string,
}


export const useNewPassword =  createMutation({
    mutationKey: ['/reset-password'],
    mutationFn: (data: Variable) => api.post('/reset-password', data)
})