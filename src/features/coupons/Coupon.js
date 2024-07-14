import React, { useState } from 'react'
import { useCopyCouponMutation, selectCouponById } from '../api/couponsSlice'
import { useSelector } from "react-redux"

export const Coupon = (couponId) => {

    const [buttonText, setButtonText] = useState('Copy')

    const couponSelected = useSelector((state) => selectCouponById(state, Number(couponId.couponId)))

    const [copy, { isLoading:isLoadingCopy }] = useCopyCouponMutation()

    const copyCoupon = (e) => {
        setButtonText(!buttonText)
        if(!isLoadingCopy){
            try {
                copy(couponSelected.id).unwrap()
            } catch (err) {
                console.error('Failed to copy the coupon', err)
            }
        }
    console.log(buttonText);
    // console.log(e.target.parentElement.value);
  }

  return (
    <li className='coupon'>
        <div>{couponSelected.name}</div>
        <div>{couponSelected.code}</div>
         {/* <button onClick={copyCoupon}>{'Copy'}</button> */}
        <button onClick={copyCoupon}>{couponSelected.copied ? 'Copied' : 'Copy'}</button>
    </li>
  )
}
