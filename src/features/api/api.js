import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api', // optional
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Shop', 'Drug', 'Cart', 'DrugsShops', 'Orders', 'Customer'],
    endpoints: builder => ({})
})