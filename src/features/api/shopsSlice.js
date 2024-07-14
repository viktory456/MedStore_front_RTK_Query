import {createSelector, createEntityAdapter} from "@reduxjs/toolkit"
import {apiSlice} from '../api/api'
// import { useParams } from 'react-router-dom'

const shopsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.id.localeCompare(b.id)
})

const initialState = shopsAdapter.getInitialState()

export const shopsApiSlice = apiSlice.injectEndpoints({
       endpoints: builder => ({
        getShops: builder.query({
            query: () => '/',

            transformResponse: (responseData, meta, arg) => {
                // const drugsToShop = responseData.drugsShops.filter(item => Number(item.shopId == Number(arg)))
                // return drugsShopsAdapter.setAll(initialState, drugsToShop)
                return shopsAdapter.setAll(initialState, responseData.shops)
            },
            providesTags: { type: 'Shop', id: "LIST" },
        }),
        // getShopsDetailed: builder.query({
        //     query: () => '/shops',
        //     transformResponse: responseData => {
        //         return shopsAdapter.setAll(initialState, responseData)
        //     },
        //     providesTags: { type: 'Shop', id: "LIST" },
        //     // providesTags: (result, error, arg) => [
        //     //     {type: 'Shops', id: "LIST"},
        //     //     ...result.ids.map(({ id }) => ({ type: 'Skills', id }))
        //     // ]
        // }),
        }),
    })

export const {
    useGetShopsQuery,
    // useGetShopsDetailedQuery,
    // useDeleteSkillMutation
} = shopsApiSlice

// returns the query result object
export const selectShopsResult = shopsApiSlice.endpoints.getShops.select()

// Creates memoized selector
const selectShopsData = createSelector(
    selectShopsResult,
    shopsResult => shopsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllShops,
    selectById: selectShopById,
    selectIds: selectShopIds
    // Pass in a selector that returns the posts slice of state
} = shopsAdapter.getSelectors(state => selectShopsData(state) ?? initialState)

