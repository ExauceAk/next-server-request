// import { getServerSession } from "next-auth";

import { FetchService } from "@/services/api-sdk/lib/utils/fetch";

// async function getToken() {
//     const session = await getServerSession(authOptions);
//     return session?.accessToken!;
//   }

// const fetchService: FetchService = new FetchService({
//     requestInterceptor: async (config) => ({
//       ...config,
//       headers: {
//         ...config.headers,
//         Authorization: `Bearer ${await getToken()}`,
//       },
//     }),
//   });
  


export getAllTypeOffice = async () => {
    const response = await fetchService.get("/type-office");
  
    if (response.ok) {
      return await response.json();
    }
  
    throw new ApiError("Failed to fetch events");
  };