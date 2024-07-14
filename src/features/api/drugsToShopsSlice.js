import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from './api'
import { useParams } from 'react-router-dom'

const drugsShopsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.id.localeCompare(b.id)
})

const initialState = drugsShopsAdapter.getInitialState()

export const drugsShopsApiSlice = apiSlice.injectEndpoints({
       endpoints: builder => ({
        getDrugsShops: builder.query({
            query: () => `/`, //to use SelectId???
            transformResponse: (responseData, meta, arg) => {
                // const drugsToShop = responseData.drugsShops.filter(item => Number(item.shopId == Number(arg)))
                // return drugsShopsAdapter.setAll(initialState, drugsToShop)
                return drugsShopsAdapter.setAll(initialState, responseData.drugsShops)
            },
            providesTags: { type: 'DrugsShops', id: "LIST" },
            // providesTags: (result, error, arg) => [
            //     ...result.ids.map(id => ({ type: 'DrugsToShops', id }))
            // ]
    }),
})
})
export const {
    useGetDrugsShopsQuery
} = drugsShopsApiSlice

// returns the query result object
export const selectDtSResult = drugsShopsApiSlice.endpoints.getDrugsShops.select()

// Creates memoized selector
const selectDtSData = createSelector(
    selectDtSResult,
    DtSResult => DtSResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllDtS,
    selectById: selectDtSById,
    selectIds: selectDtSIds
    // Pass in a selector that returns the posts slice of state
} = drugsShopsAdapter.getSelectors(state => selectDtSData(state) ?? initialState)