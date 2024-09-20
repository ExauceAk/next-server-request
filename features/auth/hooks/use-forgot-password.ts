import api from '#/lib/axios-instance'
import { createMutation } from 'react-query-kit'

type Variable = {
    email: string,
    
}


export const useForgotPassword =  createMutation({
    mutationKey: ['/forgot-password'],
    mutationFn: (data: Variable) => api.post('/forgot-password', data)
})