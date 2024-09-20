import api from '#/lib/axios-instance'
import { createMutation } from 'react-query-kit'

type Variable = {
    officeName: string,
    officeEmail: string,
    officePhoneNumber: string,
    ownerEmail: string,
    ownerPassword: string,
}

export const useRegister =  createMutation({
    mutationKey: ['/register'],
    mutationFn: (data: Variable) => api.post('/register', data)
})