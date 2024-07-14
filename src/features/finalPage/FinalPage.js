import { InputForm } from './InputForm'
import { ShoppingCart } from './ShoppingCart'
// import { useAddCustomerMutation } from '../api/cartSlice'
import React, { createContext, useContext, useState } from "react"
import { useAddOrderMutation } from '../api/ordersSlice'

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

  // const [addCustomer, { isLoading, isSuccess }] = useAddCustomerMutation()
  const [addOrder, { isLoading:isLoadingAddOrder, isSuccess:isSuccessAddOrder }] = useAddOrderMutation()


  // const onSubmitClicked = async () => {
  //   if(!isLoadingAddOrder) {
  //     try {
  //       // await addCustomer({ name, email, phone, adress}).unwrap()
  //       await addOrder({ name, email, phone, adress, deliveryType:currier, totalCost:cartTotal, order:cart}).unwrap()

  //     } catch (err) {
  //         console.error('Failed to summbit the purchase', err)
  //     }
  //   } else {
  //     console.log('not loading add order');
  //   }
  // }
  
  return (
    <NameContext.Provider value={name}>
      <EmailContext.Provider value={email}>
        <PhoneContext.Provider value={phone}>
          <AdressContext.Provider value={adress}>
          <CartTotalContext.Provider value={cartTotal}>
            <CurrierContext.Provider value={currier}>
          <div className='finalPage'>
            <div style={{width:'40%'}}>
            <div className='googleMap'>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d162758.58827211132!2d30.36788683338299!3d50.40191909148036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf4ee15a4505%3A0x764931d2170146fe!2sKyiv%2C%20Ukraine%2C%2002000!5e0!3m2!1sen!2spl!4v1719164406785!5m2!1sen!2spl" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <InputForm setName={setName} setAdress={setAdress} setEmail={setEmail} setPhone={setPhone} setCurrier={setCurrier}/>
            </div>

            <ShoppingCart setCartTotal={setCartTotal} setCart={setCart} name={name} email={email} phone={phone} adress={adress} deliveryType={currier} totalCost={cartTotal} order={cart}/> 

           </div>
           {/* <button className="submitButton" onClick={onSubmitClicked}>Submit</button> */}
           </CurrierContext.Provider>
           </CartTotalContext.Provider>
          </AdressContext.Provider>
        </PhoneContext.Provider>
      </EmailContext.Provider>
    </NameContext.Provider>
    

  )
}

