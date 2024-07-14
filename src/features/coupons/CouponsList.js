import React from 'react'
import { selectAllCoupons, useGetCouponsQuery, selectCouponById } from '../api/couponsSlice'
import { useSelector } from "react-redux"
import { Coupon } from './Coupon'

export const CouponsList = () => {
  const coupons = useSelector(selectAllCoupons)
  let couponsList = coupons.map(id => <Coupon key={id.id} couponId={id.id}/>)
  // console.log(coupons);

  return (
    <div className='coupons'>
      <ul className='couponsList'>{couponsList}</ul>
    </div>

  )
}
