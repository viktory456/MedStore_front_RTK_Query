import React, { useContext, useState, useEffect } from 'react'
import {Stack, FormControlLabel, Checkbox, TextField} from '@mui/material'
import styled from "styled-components"


const StyledTextField = styled(TextField)(({ theme }) => ({
  '.MuiInputLabel-standard':{
    // [theme.breakpoints.down('md')]: {
    //   fontSize: '10px',
    // },
    // [theme.breakpoints.up('md')]: {
    //   fontSize: '12px',
    // },
    // [theme.breakpoints.up('lg')]: {
    //   fontSize: '14px',
    // },

    // fontSize:{
    //   xs: '10px',
    //   sm: '12px',
    //   md: 14,
    // }
    // fontSize: '10px'
  },
    '& label.Mui-focused': {
        color: '#846C98',
      },
    '& .MuiInput-underline:after':{
        borderBottomColor: '#846C98',
    }
  }));

export const InputForm = ({setName, setAdress, setPhone, setEmail, setCurrier}) => {
    let [nameLocal, setNameLocal] = useState('')
    let [emailLocal, setEmailLocal] = useState('')
    let [phoneLocal, setPhoneLocal] = useState('')
    let [adressLocal, setAdressLocal] = useState('')
    let [currierLocal, setCurrierLocal] = useState(false)

    const onNameChanged = e => {setNameLocal(e.target.value)}
    const onEmailChanged = e => {setEmailLocal(e.target.value)}
    const onPhoneChanged = e => {setPhoneLocal(e.target.value)}
    const onAdressChanged = e => {setAdressLocal(e.target.value)}
    const onCurrierChecked = e => {setCurrierLocal(e.target.checked)}
    useEffect(() => {
        setName(nameLocal)
        setEmail(emailLocal)
        setPhone(phoneLocal)
        setAdress(adressLocal)
        setCurrier(currierLocal)
    }, [nameLocal, emailLocal, phoneLocal, adressLocal, currierLocal])

  return (
     <Stack direction='column' spacing={2} border='1px solid #1F273D' borderRadius={3} color='#1F273D' padding='25px' sx={{width:{md:'70%', lg:'100%'}}}>

        <StyledTextField id="name" label="Name" variant="standard" value={nameLocal} onChange={onNameChanged}/>
        <StyledTextField id="email" label="Email" variant="standard" value={emailLocal} onChange={onEmailChanged}/>
        <StyledTextField id="phone" label="Phone" variant="standard" value={phoneLocal} onChange={onPhoneChanged}/>
        <StyledTextField id="adress" label="Adress" variant="standard" value={adressLocal} onChange={onAdressChanged}/>
        <FormControlLabel control={<Checkbox color="success"/>} label="Currier delivery" checked={currierLocal} onChange={onCurrierChecked}/>

    </Stack>
  )
}
