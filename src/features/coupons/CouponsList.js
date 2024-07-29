import React from 'react'
import { selectAllCoupons } from '../api/couponsSlice'
import { useSelector } from "react-redux"
import { Coupon } from './Coupon'
import Grid from '@mui/material/Grid'

export const CouponsList = () => {
  
  const coupons = useSelector(selectAllCoupons)
  let couponsList = coupons.map(id => <Coupon key={id.id} couponId={id.id}/>)

  return (
    <Grid container sx={{border:'1px solid #1F273D', borderRadius:'10px', justifyContent:'space-evenly'}}>
      {couponsList}
    </Grid>

  )
}
 