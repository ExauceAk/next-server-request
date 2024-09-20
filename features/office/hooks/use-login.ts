import api from '#/lib/axios-instance'
import { createQuery } from 'react-query-kit'

type Response = Array<{
    id: string,
    title: string,
    label: string,
    }>

export const useTypeOffices =  createQuery({
    queryKey: ['#'],
    fetcher: () : Promise<Response> => api.get('#')
})