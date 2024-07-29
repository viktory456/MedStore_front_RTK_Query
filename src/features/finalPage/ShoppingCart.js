import React, {useEffect, useState} from 'react'
import { selectAllCart } from '../api/cartSlice'
import { selectAllCoupons } from '../api/couponsSlice'
import { useSelector } from "react-redux"
import { useAddOrderMutation } from '../api/ordersSlice'
import { Captcha } from '../coupons/Captcha'
import {Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, Box, Button} from '@mui/material'
import styled from "styled-components"


const CartStyled = styled(Stack)(() => ({
  border: '1px solid #1F273D',
  borderRadius: '10px',
  direction:'column',
  alignItems:'center',
  justifyContent:'space-between',
}));

export const ShoppingCart = ({setCartTotal, setCart, name, email, phone, adress, deliveryType, totalCost, order}) => {
  const [buttonStatus, setButtonStatus] = useState(true)
  const [addOrder, { isLoading:isLoadingAddOrder, isSuccess:isSuccessAddOrder }] = useAddOrderMutation()
  const coupons = useSelector(selectAllCoupons)
  let couponsSelected = [{name:'Coupons applied: (uah)'}];
  let couponsSum = 0;
  for (let i = 0; i < coupons.length; i++) {
    if(coupons[i].copied === true){
      couponsSum+=Number(coupons[i].name);
      couponsSelected.push(coupons[i])
    }
  }
  const couponsSelectedDiv = couponsSelected.map(coupon => {
    return <Box key={coupon.name}>{coupon.name}</Box>
  })
  const cart = useSelector(selectAllCart)
  function total(){
    let temp = cart.map(function(item){
      return item.price*item.quantity
    })
    let sum = temp.reduce(function(prev, next){
      return prev+next
    }, 0)
    return sum
  }
  let totalCart = total(); 
  let totalCartWithCoupons = totalCart - Number(couponsSum);
  localStorage.setItem('cart', JSON.stringify(cart));

  useEffect(() => {
    setCartTotal(totalCart.toFixed(2));
    const cartToSave = JSON.stringify(cart)
    setCart(cartToSave)
  }, [totalCart, cart])

  const onSubmitClicked = async () => {
    if(!isLoadingAddOrder) {
      try {
        await addOrder({ name, email, phone, adress, deliveryType, totalCost, order}).unwrap()
      } catch (err) {
          console.error('Failed to summbit the purchase', err)
      }
    } else {
      console.log('not loading add order');
    }
  }

  return (
    <CartStyled sx={{ padding:{xs:'10px', sm:'30px'}}}>

    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="cart table" >
        <TableHead>
          <TableRow>
            <TableCell sx={{color:'#1F273D'}} align="center">Medicine</TableCell>
            <TableCell sx={{color:'#1F273D'}} align="center">Price</TableCell>
            <TableCell sx={{color:'#1F273D'}} align="center">Quantity</TableCell>
            <TableCell sx={{color:'#1F273D'}} align="center">Seller</TableCell>
            <TableCell sx={{color:'#1F273D'}} align="center">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((item) => (
            <TableRow key={item.price} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell sx={{color:'#1F273D'}} align="center" component="th" scope="row">{item.name}</TableCell>
              <TableCell sx={{color:'#1F273D'}} align="center">{item.price}</TableCell>
              <TableCell sx={{color:'#1F273D'}} align="center">{item.quantity}</TableCell>
              <TableCell sx={{color:'#1F273D'}} align="center">{item.shop}</TableCell>
              <TableCell sx={{color:'#1F273D'}} align="center">{(item.price*item.quantity).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      <Grid container justifyContent="space-between" alignItems="flex-end" columns={12} rows={3}>
        <Grid item xs={6} height='100px' width='100px' sx={{marginTop:'15px'}}><Typography fontSize={{xs:'12px', sm:'16px'}} color='#1F273D'>{couponsSelected.length > 0 ? couponsSelectedDiv : 'Selected Coupons: none'}</Typography></Grid>
        <Grid item xs={6} height='100px' width='100px'><Typography fontSize={{xs:'12px', sm:'16px'}}  color='#1F273D' align='right'>{'Total: '}{totalCartWithCoupons.toFixed(2)}</Typography></Grid>
        <Grid item xs={12} height='150px' align='right' width='100px'><Captcha setButtonStatus={setButtonStatus}/></Grid>
        <Grid item xs={12} height='150px' width='100px'><Button sx={{width:'140px', height:'40px', border:'1px solid #1F273D', borderRadius:'5px', color:'#1F273D'}} type="button" onClick={onSubmitClicked} disabled={buttonStatus}>Confirm order</Button></Grid>
      </Grid>
    </CartStyled>
  )
}
