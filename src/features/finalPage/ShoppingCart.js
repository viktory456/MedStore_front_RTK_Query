import React, {useEffect, useState} from 'react'
import { useGetCartQuery, selectAllCart } from '../api/cartSlice'
import { useCopyCouponMutation, selectCouponById, selectAllCoupons } from '../api/couponsSlice'
import CartItem from './CartItem'
import { useSelector } from "react-redux"
import { useAddOrderMutation } from '../api/ordersSlice'
import { Captcha } from '../coupons/Captcha'

export const ShoppingCart = ({setCartTotal, setCart, name, email, phone, adress, deliveryType, totalCost, order}) => {
  const [buttonStatus, setButtonStatus] = useState(true)
  const [addOrder, { isLoading:isLoadingAddOrder, isSuccess:isSuccessAddOrder }] = useAddOrderMutation()
  const coupons = useSelector(selectAllCoupons)
  let couponsSelected = [{name:'Coupons applied: (uah)'}];
  let couponsSum = 0;
  for (let i = 0; i < coupons.length; i++) {
    if(coupons[i].copied === true){
      couponsSum+=coupons[i].name;
      couponsSelected.push(coupons[i])
    }
  }
  const couponsSelectedDiv = couponsSelected.map(coupon => {
    return <div key={coupon.id}>{coupon.name}</div>
  })
  const cart = useSelector(selectAllCart)
  const contentCart = cart.map(cartItemId=> <CartItem key={cartItemId.id} cartItemId={cartItemId}/>)
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
    setCartTotal(totalCart);
    const cartToSave = JSON.stringify(cart)
    setCart(cartToSave)
  }, [totalCart, cart])

  const onSubmitClicked = async () => {
    if(!isLoadingAddOrder) {
      try {
        // await addCustomer({ name, email, phone, adress}).unwrap()
        await addOrder({ name, email, phone, adress, deliveryType, totalCost, order}).unwrap()

      } catch (err) {
          console.error('Failed to summbit the purchase', err)
      }
    } else {
      console.log('not loading add order');
    }
  }

  return (
    <div className='shoppingCart'>
      <div className='cartTitle'>
          <div>Medicine</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Shop</div>
          <div>Total</div>
          <div></div>
      </div>
      <div>{contentCart}</div>
      <div className='cartBottom'>
        <div className='couponsCopied'>{couponsSelected.length > 0 ? couponsSelectedDiv : 'Selected Coupons: none'}</div>
        <Captcha setButtonStatus={setButtonStatus}/>
        <div className='cartTotal'><div>{'Total:'}</div><div>{totalCartWithCoupons.toFixed(2)}</div></div>
        <button className="submitButton" onClick={onSubmitClicked} disabled={buttonStatus}>Confirm order</button>
      </div>

    </div>

  )
}
