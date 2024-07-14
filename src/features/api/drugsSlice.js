import {createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import {apiSlice} from '../api/api'

const drugsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.id.localeCompare(b.id)
})
const priceSortedAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.id.localeCompare(b.id)
})
//to create another entityadaper with sortedbyprice drugs
//to read again about tags
const initialState = drugsAdapter.getInitialState()

export const drugsApiSlice = apiSlice.injectEndpoints({
       endpoints: builder => ({
        getDrugs: builder.query({
            query: () => '/',
            transformResponse: responseData => {
                return drugsAdapter.setAll(initialState, responseData.drugs)
            },
            // providesTags: (result) =>
            //     result
            //       ? [
            //           ...result.ids.map(({ id }) => ({ type: 'Drug', id })),
            //           { type: 'Drug', id: 'LIST' },
            //         ]
            //       : [{ type: 'Drug', id: 'LIST' }],
        }),
        getDrugsByPrice: builder.query({
            query: () => '/',
            transformResponse: responseData => {
                return priceSortedAdapter.setAll(priceSortedAdapter.getInitialState(), responseData.drugs)
            },
            // providesTags: (result) =>
            //     result
            //       ? [
            //           ...result.ids.map(({ id }) => ({ type: 'Drug', id })),
            //           { type: 'Drug', id: 'LIST' },
            //         ]
            //       : [{ type: 'Drug', id: 'LIST' }],
        }),
        //почитати про transformResponse, createEntityAdapter
        addFavorite: builder.mutation({
            query: (id , newFav) => ({
                url: `/favorite`,
                method: 'PUT',
                body: {id, newFav}
            }),
            // invalidatesTags: (result, error, id) => [
            //     { type: 'Drug', id }
            // ]
            //how to make rerender after qty change??
        }),

    })
})
export const {
    useGetDrugsQuery,
    useGetDrugsByPriceQuery,
    useAddFavoriteMutation
} = drugsApiSlice

// returns the query result object
export const selectDrugsResult = drugsApiSlice.endpoints.getDrugs.select()

const selectDrugsData = createSelector(
    selectDrugsResult,
    drugsResult => drugsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllDrugs,
    selectById: selectDrugById,
    selectIds: selectDrugIds
    // Pass in a selector that returns the posts slice of state
} = drugsAdapter.getSelectors(state => selectDrugsData(state) ?? initialState)


