import React, {useState, useEffect} from 'react'
import { selectAllOrders } from '../api/ordersSlice'
import { useSelector } from "react-redux"
import { SingleOrder } from '../history/SingleOrder'
import styled from "styled-components"
import { Typography, Box, TextField, Stack, Grid } from '@mui/material'


const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
      color: '#846C98',
    },
  '& .MuiInput-underline:after':{
      borderBottomColor: '#846C98',
  }
});

const StackStyled = styled(Stack)({
  overflowY: "auto",
  '&::-webkit-scrollbar': {
    width: '0.4em'
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px #E9F5FF',
    webkitBoxShadow: 'inset 0 0 6px #E9F5FF'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'white',
    outline: '1px solid #846C98',
    borderRadius: '4px',
  }
});

export const History = () => {
  
  const orders = useSelector(selectAllOrders)
  let ordersList = orders.map(orderId => <SingleOrder orderId={orderId} key={orderId.id}/>)
  const customers = useSelector(selectAllOrders)
  let chosenCustomer = null;
  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState('')
  const onEmailChanged = e => {setEmail(e.target.value)}
  const onPhoneChanged = e => {setPhone(e.target.value)}
  
  for (const customer of customers) {
    if (customer.customerEmail == email || customer.customerPhone == phone) {
      chosenCustomer = customer.id
      break
    }
  }
  
  return (
    <Box>
      <Grid container sx={{position:'fixed', top:'100px', display:{xs:'flex', sm:'grid'}, justifyContent:'center', width:{xs:'80vw', sm:'100vw'}}}>
        <Grid item padding='20px' display='flex' justifyContent='center'><Typography sx={{color:'#1F273D', padding:'20px', textAlign:'center'}}>Type your email / phone number to pick your order </Typography></Grid>
        <Grid item>
        <Stack sx={{width:{xs:'200px', sm:'400px'}, margin: 'auto'}}>
          <StyledTextField id="email" label="Email" variant="standard" value={email} onChange={onEmailChanged}/>
          <StyledTextField id="phone" label="Phone" variant="standard" value={phone} onChange={onPhoneChanged}/>
        </Stack>
        </Grid>

      </Grid>

      <StackStyled sx={{border:'1px solid #846C98', borderRadius:'5px', marginTop:{xs:'400px', sm:'350px'}, height:'700px'}}>{ordersList[chosenCustomer] || ordersList}</StackStyled>

    </Box>

  )

}
