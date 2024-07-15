import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetShopsQuery, selectShopById } from '../api/shopsSlice'
import MedsShops from '../meds/MedsShops'
import { useSelector } from 'react-redux'

export const ShopPage = () => {

    const { shopId } = useParams()
    const shop = useSelector((state) => selectShopById(state, Number(shopId)))

    return (
    <div className='shopPage'>
        <div className='shopTitle'>{shop.title}</div>
        <div className='shopAdress'>{shop.adress}</div>
        <MedsShops shopId={shopId}/>
    </div>

  )
}
