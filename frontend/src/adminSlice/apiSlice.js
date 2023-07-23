import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';


const baseQuery = fetchBaseQuery({ baseUrl: '' });


 const adminSlice = createApi({
    baseQuery,
    tagTypes: ['admins'],
    endpoints: (build) => ({}),
  });

  export {adminSlice}