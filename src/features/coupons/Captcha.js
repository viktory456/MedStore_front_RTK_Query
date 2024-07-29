import React from 'react'
import { useEffect, useState } from'react'
import { TextField, Typography, Button, Grid } from '@mui/material'
import styled from "styled-components"


const StyledTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#1F273D',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#846C98',
    },
    // '& .MuiOutlinedInput-root': {
    //   '& fieldset': {
    //     borderColor: 'green',
    //   },
    //   '&:hover fieldset': {
    //     borderColor: 'blue',
    //   },
    //   '&.Mui-focused fieldset': {
    //     borderColor: 'pink',
    //   },
    // },
  });
const CaptchaImage= styled(Typography)(() => ({
    fontWeight: 400,
    userSelect: 'none',
    textDecoration:'line-through',
    fontStyle: 'italic',
    fontSize: 'x-large',
    border: '#846C98 1px solid',
    borderRadius: '5px',
    padding: '5px',
    textAlign: 'center'
}));

export const Captcha = ({setButtonStatus}) => {

let [keyText, setKeyText] = useState('');
let [captcha, setCaptcha] = useState('');
let [captchaCode, setCaptchaCode] = useState('');
useEffect(() => { Generate()}, [])
function Generate() {
    setCaptchaCode("")
    let uniquechar = "";
    const randomchar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 1; i < 5; i++) {
        uniquechar += randomchar.charAt(Math.random() * randomchar.length)
    }
    setCaptcha(uniquechar)
}
const captchaChange = (e) => {setCaptchaCode(e.target.value)}
function Printmsg() {
    const usr_input = captchaCode;
    if (usr_input == captcha) {
        setKeyText("Matched");
        setButtonStatus(false)
        Generate();
    }
    else {
        setKeyText("not Matched");
        Generate();
    }
}
  return (
    <Grid container justifyContent='space-between' alignItems='center' spacing={{xs:'3px', sm:3}}>
        <Grid item xs={4} id="captcha_image" selectable="False" align='left'><CaptchaImage>{captcha}</CaptchaImage></Grid>
        <Grid item xs={4} align='right'>
          <StyledTextField
          id="standard-helperText"
          label="Type captcha code"
          helperText="to unblock submitting"
          variant="standard"
          onChange={captchaChange}
        />
        </Grid>
        <Grid item xs={4} align='center'><Button variant="contained" onClick={Printmsg} sx={{bgcolor:'#846C98', maxWidth:{xs:'35px', sm:'80px'}}}>Submit</Button></Grid>
        <Grid xs={12} item><Typography sx={{color: (keyText === 'Matched') ? 'green' : 'red', paddingRight:'60px'}}>{keyText}</Typography></Grid>
    </Grid>
  )
}
