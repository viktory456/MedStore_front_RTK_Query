import { useGetDrugsQuery, selectDrugById, selectAllDrugs} from '../api/drugsSlice'
import {useAddToCartMutation} from '../api/cartSlice'
import {Buffer} from "buffer" 
import { useState, useEffect } from 'react'
import { useGetShopsQuery, selectAllShops, selectShopById } from '../api/shopsSlice'
import { StarEmpty, StarSolid } from './Favorites'
import {useAddFavoriteMutation} from '../api/drugsSlice'
import { useSelector } from 'react-redux'


const Drug = ({drugId}) => {
    const [addFavorite, {isLoading:isLoadingAddFav}] = useAddFavoriteMutation()
    const [quantity, setQuantity] = useState(1)

    const qtyDecrease = () => {
        if (quantity === 1) {
            return;
        }
        setQuantity(quantity - 1)
    }
    const qtyIncrease = () => setQuantity(quantity + 1)

    // const { drug } = useGetDrugsQuery('getDrugs', {
    //     selectFromResult: ({ data }) => ({
    //         drug: data?.entities[drugId]
    //     }),
    // })
    const drugs = useSelector(selectAllDrugs)
    const drug = useSelector((state) => selectDrugById(state, Number(drugId.id)))
    const shops = useSelector(selectAllShops)
    const shop = useSelector((state) => selectShopById(state, Number(drug?.shop_id)))

    const [favorite, setFavorite] = useState(drug?.favorite)
    // const { shop } = useGetShopsQuery('getShops', {
    //     selectFromResult: ({ data }) => ({
    //         shop: data?.entities[drug?.shop_id]
    //     }),
    // })
    const base64 = Buffer.from(drug?.img.data, "binary" ).toString("base64");
    const idInCart = `${drug?.id}${new Date().getTime()}`
    const [addToCart, { isLoading }] = useAddToCartMutation()

    const onAddItemClicked = async () => {
        if (!isLoading) {
            try {
                await addToCart({ id: idInCart, name: drug?.name, shop: drug?.shop_id, quantity: quantity, price: drug?.price }).unwrap()
            } catch (err) {
                console.error('Failed to add the item', err)
            }
        }
    }

    const toggleFav = () => {
        if(!isLoadingAddFav){
            addFavorite(Number(drugId.id)).unwrap()
        }
    }

  return (
    <article className='drugItem'>
        <div className='favIcon' onClick={toggleFav}>
            {favorite ? <StarSolid /> : <StarEmpty />}
        </div>
        <img className='drugPic' src={`data:image/png;base64,${base64}`}/>
        <div className='picDescription'>
            <h2>{drug.name}</h2>
            <p>{`${drug.price} uah`}</p>
            <h2>{shop?.name}</h2>
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

export default Drug