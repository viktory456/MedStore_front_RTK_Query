import {createSelector, createEntityAdapter} from "@reduxjs/toolkit"
import {apiSlice} from './api'

const couponsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.id.localeCompare(b.id)
})

const initialState = couponsAdapter.getInitialState()

export const couponsApiSlice = apiSlice.injectEndpoints({
       endpoints: builder => ({
        getCoupons: builder.query({
            query: () => '/coupons',
            transformResponse: responseData => {
                return couponsAdapter.setAll(initialState, responseData)
            },
            providesTags: { type: 'Coupons', id: "LIST" },
        }),
        copyCoupon: builder.mutation({
            query: (id) => ({
                url: `/coupons`,
                method: 'PUT',
                body: {id}
            }),
            invalidatesTags: { type: 'Coupons', id: "LIST" },
    })
})
})
export const {
    useGetCouponsQuery,
    useCopyCouponMutation
} = couponsApiSlice
// returns the query result object
export const selectCouponsResult = couponsApiSlice.endpoints.getCoupons.select()
// Creates memoized selector
const selectCouponsData = createSelector(
    selectCouponsResult,
    couponsResult => couponsResult.data // normalized state object with ids & entities
)
//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllCoupons,
    selectById: selectCouponById,
    selectIds: selectCouponIds
    // Pass in a selector that returns the posts slice of state
} = couponsAdapter.getSelectors(state => selectCouponsData(state) ?? initialState)