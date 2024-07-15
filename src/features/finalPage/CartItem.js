import { useGetDrugsQuery} from '../api/medsSlice'
import {useAddToCartMutation, selectAllCart, selectCartById} from '../api/cartSlice'
import {Buffer} from "buffer" 
import { useState } from 'react'
import { useGetShopsQuery, selectShopById } from '../api/shopsSlice'
import { useGetCartQuery, useDeleteFromCartMutation, useIncreaseQtyMutation, useDecreaseQtyMutation } from '../api/cartSlice'
import { useSelector } from "react-redux"



const CartItem = ({cartItemId}) => {

    const cartItem = useSelector((state) => selectCartById(state, Number(cartItemId.id)))

    const [deleteItem] = useDeleteFromCartMutation()
    const [increaseItemQty] = useIncreaseQtyMutation()
    const [decreaseItemQty] = useDecreaseQtyMutation()

    const deleteItemClicked = async () => {
      try {
          await deleteItem({id: cartItem.id}).unwrap()
      } catch (err) {
          console.error('Failed to delete the item', err)
      }
    }
  const itemQtyChanged = async (e) => {
    try {
      if(e.target.innerText === '>') {
        await increaseItemQty(cartItem).unwrap()
      } else if(e.target.innerText === '<') {
        await decreaseItemQty(cartItem).unwrap()
      }
    } catch (err) {
        console.error('Failed to change qty', err)
    }
  }
  const shop = useSelector((state) => selectShopById(state, Number(cartItem?.shop)))
  const itemTotal = (cartItem?.price * cartItem?.quantity).toFixed(2)

  return (
    <article className='cartItem'>
        <div>{cartItem?.name}</div>
        <div>{cartItem?.price}</div>
        <div className='qtyCart'><div className='qtyBtn' onClick={itemQtyChanged}>{'<'}</div><div>{cartItem?.quantity}</div><div className='qtyBtn' onClick={itemQtyChanged}>{'>'}</div></div>
        <div>{shop?.title}</div>
        <div>{itemTotal}</div>
        <div onClick={deleteItemClicked}><button className='rmvBtn'>Remove</button></div>
    </article>
  )
}

export default CartItem