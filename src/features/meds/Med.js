import { useGetMedsQuery, selectMedById, selectAllMeds} from '../api/medsSlice'
import {useAddToCartMutation, selectAllCart} from '../api/cartSlice'
import {Buffer} from "buffer" 
import { useState, useEffect } from 'react'
import { useGetShopsQuery, selectAllShops, selectShopById } from '../api/shopsSlice'
import { StarEmpty, StarSolid } from './Favorites'
import {useAddFavoriteMutation} from '../api/medsSlice'
import { useSelector } from 'react-redux'

const Med = ({medId}) => {
    const [addFavorite, {isLoading:isLoadingAddFav}] = useAddFavoriteMutation()
    const meds = useSelector(selectAllMeds)
    const med = useSelector((state) => selectMedById(state, Number(medId.id)))
    const cart = useSelector(selectAllCart)
    let startingQty = 1;
    for(let i =0; i < cart.length; i++){
        if(cart[i].shop == med.shop_id && cart[i].name == med.name){
            startingQty = Number(cart[i].quantity)
        }
    }
    const [quantity, setQuantity] = useState(startingQty)
    const qtyDecrease = () => {
        if (quantity === 1) {
            return;
        }
        setQuantity(quantity - 1)
    }
    const qtyIncrease = () => setQuantity(quantity + 1)

    const shops = useSelector(selectAllShops)
    const shop = useSelector((state) => selectShopById(state, Number(med?.shop_id)))
    const [favorite, setFavorite] = useState(med?.favorite)
    const base64 = Buffer.from(med?.img.data, "binary" ).toString("base64");
    const idInCart = `${med?.id}${new Date().getTime()}`
    const [addToCart, { isLoading }] = useAddToCartMutation()

    const onAddItemClicked = async () => {
        if (!isLoading) {
            try {
                await addToCart({ id: idInCart, name: med?.name, shop: med?.shop_id, quantity: quantity, price: med?.price }).unwrap()
            } catch (err) {
                console.error('Failed to add the item', err)
            }
        }
    }
    const toggleFav = () => {
        if(!isLoadingAddFav){
            addFavorite(Number(medId.id)).unwrap()
        }
    }

  return (
    <article className='medItem'>
        <div className='favIcon' onClick={toggleFav}>
            {favorite ? <StarSolid /> : <StarEmpty />}
        </div>
        <img className='medPic' src={`data:image/png;base64,${base64}`}/>
        <div className='picDescription'>
            <h2>{med.name}</h2>
            <p>{`${med.price} uah`}</p>
            <h2>{shop?.title}</h2>
            <div className='qtyCounter'>
                <button className='qtyButton' onClick={qtyDecrease}>{'-'}</button>
                <div>{quantity}</div>
                <button className='qtyButton' onClick={qtyIncrease}>{'+'}</button>
            </div>
            <button className='buyButton' type="button" onClick={onAddItemClicked}>{'add to Cart'}</button>
        </div>
    </article>
  )
}

export default Med