import React, {useState, useEffect} from 'react'
import { selectAllOrders } from '../api/ordersSlice'
import { useSelector } from "react-redux"
import { SingleOrder } from '../history/SingleOrder'

export const History = () => {

  const orders = useSelector(selectAllOrders)
  let ordersList = orders.map(orderId => <SingleOrder orderId={orderId} key={orderId.id}/>)
  const customers = useSelector(selectAllOrders)
  let chosenCustomer = null;
  let [email, setEmail] = useState('')
  let [phone, setPhone] = useState('')
  const onEmailChanged = e => {
    setEmail(e.target.value)
  }
  const onPhoneChanged = e => {
    setPhone(e.target.value)
  }
  for (const customer of customers) {
    if (customer.customerEmail == email || customer.customerPhone == phone) {
      chosenCustomer = customer.id
      break
    }
  }
  return (
    <div>
      <form className='inputForm'>
      <p style={{color:'darkslategrey'}}>Type your email & phone number to pick your order </p>
        <label className='historyInputLabel' htmlFor="email">Email:</label>
        <input
            className='historyInput'
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={onEmailChanged}
        />
        <label className='historyInputLabel' htmlFor="phone">Phone:</label>
        <input
           className='historyInput'
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={onPhoneChanged}
        />
      </form>
      <ul className='ordersList'>{ordersList[chosenCustomer] || ordersList}</ul>
    </div>

  )

}
