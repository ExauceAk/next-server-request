// import { createMutation } from 'react-query-kit';
import api from '@/lib/axios-instance';
import { useQuery } from '@tanstack/react-query';
import { FetchService } from './api-sdk/lib/utils/fetch';
import { ApiError } from './api-sdk/errors';

export class Service {
  private port: number;

  constructor(port: number) {
    this.port = port;
  }


  // fetchService: FetchService = new FetchService({exportexport
  //   requestInterceptor: async (config) => ({
  //     ...config,
  //     headers: {
  //       ...config.headers,
  //       Authorization: `Bearer ${await getToken()}`,
  //     },
  //   }),
  // });

   fetchService: FetchService = new FetchService();

  // cettte methode fonctionne

  // useGet = () =>
  //   useQuery({
  //     queryKey: ['/type'],
  //     queryFn: () => api.get(`/office-types`),
  //   });

    useGet = (queryKey: [string]) => {
       return  useQuery({
        queryKey: queryKey,
        queryFn: () => this.getAllTypeOffice(),
    });
  };


    getAllTypeOffice = async () => {
      const response = await this.fetchService.get("/type-office");
    
      if (response.ok) {
        return await response.json();
      }
    
      throw new ApiError("Failed to fetch events");
    };

  // useCreate = createMutation({
  //   mutationKey: ['/register'],
  //   mutationFn: (data: any) => api.post('/register', data),
  // });
}


