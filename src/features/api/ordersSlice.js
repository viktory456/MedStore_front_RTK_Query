import {createSelector, createEntityAdapter} from "@reduxjs/toolkit"
import {apiSlice} from './api'

const ordersAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.id.localeCompare(b.id)
})

const initialState = ordersAdapter.getInitialState()

export const ordersApiSlice = apiSlice.injectEndpoints({
       endpoints: builder => ({
        getOrders: builder.query({
            query: () => '/orders',
            transformResponse: responseData => {
                return ordersAdapter.setAll(initialState, responseData)
            },
            providesTags: { type: 'Orders', id: "LIST" },
        }),
        addOrder: builder.mutation({
            query: itemToAdd => ({
                url: '/orders',
                method: 'POST',
                body: itemToAdd
            }),
            invalidatesTags: [
                { type: 'Orders', id: "LIST" }
            ]
        }),

    })
})
export const {
    useGetOrdersQuery,
    useAddOrderMutation
} = ordersApiSlice

// returns the query result object
export const selectOrdersResult = ordersApiSlice.endpoints.getOrders.select()

// Creates memoized selector
const selectOrdersData = createSelector(
    selectOrdersResult,
    ordersResult => ordersResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById,
    selectIds: selectOrderIds
    // Pass in a selector that returns the posts slice of state
} = ordersAdapter.getSelectors(state => selectOrdersData(state) ?? initialState)
