import { InputForm } from './InputForm'
import { ShoppingCart } from './ShoppingCart'
import React, { createContext, useState } from "react"
import {Stack} from '@mui/material'


const NameContext = createContext();
const EmailContext = createContext();
const PhoneContext = createContext();
const AdressContext = createContext();
const CartTotalContext = createContext();
const CurrierContext = createContext();

export const FinalPage = () => {

  const [name, setName] = useState('name');
  const [email, setEmail] = useState('email');
  const [phone, setPhone] = useState('phone');
  const [adress, setAdress] = useState('adress');
  const [cartTotal, setCartTotal] = useState(0);
  const [cart, setCart] = useState('');
  const [currier, setCurrier] = useState(false);

  return (
    <NameContext.Provider value={name}>
      <EmailContext.Provider value={email}>
        <PhoneContext.Provider value={phone}>
          <AdressContext.Provider value={adress}>
          <CartTotalContext.Provider value={cartTotal}>
            <CurrierContext.Provider value={currier}>
              <Stack direction={{xs:'column', lg:'row'}} justifyContent='center' spacing={2}>
                <Stack direction={{xs:'column', md:'row', lg:'column'}} spacing={2} sx={{width:{xs:'100%', lg:'40%'}}}>
                    <iframe height='350px' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d162758.58827211132!2d30.36788683338299!3d50.40191909148036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf4ee15a4505%3A0x764931d2170146fe!2sKyiv%2C%20Ukraine%2C%2002000!5e0!3m2!1sen!2spl!4v1719164406785!5m2!1sen!2spl" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>

                  <InputForm setName={setName} setAdress={setAdress} setEmail={setEmail} setPhone={setPhone} setCurrier={setCurrier} />
                </Stack>

                <ShoppingCart setCartTotal={setCartTotal} setCart={setCart} name={name} email={email} phone={phone} adress={adress} deliveryType={currier} totalCost={cartTotal} order={cart}/> 
               </Stack>

            </CurrierContext.Provider>
           </CartTotalContext.Provider>
          </AdressContext.Provider>
        </PhoneContext.Provider>
      </EmailContext.Provider>
    </NameContext.Provider>
    

  )
}

