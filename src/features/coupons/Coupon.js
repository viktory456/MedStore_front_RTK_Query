import React, { useState } from 'react'
import { useCopyCouponMutation, selectCouponById } from '../api/couponsSlice'
import { useSelector } from "react-redux"
import { Grid, Box, Stack, Button } from '@mui/material'
import styled from "styled-components"

const ChooseShopButton = styled(Button)(() => ({
    color: `#1F273D`,
    border: '1px solid #1F273D',
  '&:hover': {
    backgroundColor: `#846C98`,
    color: `#FFFFFF`,
    border: `1px solid #846C98`,
  }
  }));


export const Coupon = (couponId) => {

    const couponSelected = useSelector((state) => selectCouponById(state, Number(couponId.couponId)))
    const [buttonText, setButtonText] = useState(couponSelected.copied)
    const [couponCode, setCouponCode] = useState(window.innerWidth)
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
  }
  useState(() =>{
    if(window.innerWidth < 280){
      setCouponCode('')
    } else {
      setCouponCode(couponSelected.code)
    }
  },[window.innerWidth]);

  return (
    <Grid item xs={12} sm={5} md={3}sx={{border:'1px solid #1F273D', borderRadius:{xs:'5px',md:'10px'}, padding:{xs:'10px',md:'20px'}, margin:{xs:'10px',md:'20px'}}}>
        <Stack direction='column' spacing={{xs:1,md:2}} justifyContent='center' alignItems='center'>
            <Box sx={{fontSize:{xs:'16px',sm:'20px', md:'24px'}, color:'#846C98'}}>{couponSelected.name}{' uah'}</Box>
            <Box>{couponCode}</Box>
            <ChooseShopButton onClick={copyCoupon}>{buttonText ? 'Remove' : 'Copy'}</ChooseShopButton>
        </Stack>
    </Grid>
  )
}
