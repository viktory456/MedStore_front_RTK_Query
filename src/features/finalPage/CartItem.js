import { useGetDrugsQuery} from '../api/drugsSlice'
import {useAddToCartMutation, selectAllCart, selectCartById} from '../api/cartSlice'
import {Buffer} from "buffer" 
import { useState } from 'react'
import { useGetShopsQuery, selectShopById } from '../api/shopsSlice'
import { useGetCartQuery, useDeleteFromCartMutation, useIncreaseQtyMutation, useDecreaseQtyMutation } from '../api/cartSlice'
import { useSelector } from "react-redux"



const CartItem = ({cartItemId}) => {
    // const cart = useSelector(selectAllCart)
    const cartItem = useSelector((state) => selectCartById(state, Number(cartItemId.id)))

    // const { itemInCart } = useGetCartQuery('getCart', {
    //     selectFromResult: ({ data }) => ({
    //         itemInCart: data?.entities[cartItemId]
    //     }),
    // })

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
    // const { data:shops, isLoading, isSuccess, isError, error } = useGetShopsQuery('getShops')
    // let shop;
    // if (isLoading) {
    //     shop = <p>...</p>;
    //   } else if (isSuccess) {
    //     shop = shops.entities[cartItem.shop].name;
    //   }
    
    const itemTotal = (cartItem?.price * cartItem?.quantity).toFixed(2)

  return (
    <article className='cartItem'>
        <div>{cartItem?.name}</div>
        <div>{cartItem?.price}</div>
        <div className='qtyCart'><div className='qtyBtn' onClick={itemQtyChanged}>{'<'}</div><div>{cartItem?.quantity}</div><div className='qtyBtn' onClick={itemQtyChanged}>{'>'}</div></div>
        <div>{shop?.name}</div>
        <div>{itemTotal}</div>
        <div onClick={deleteItemClicked}><button className='rmvBtn'>Remove</button></div>


    </article>
  )
}

export default CartItem