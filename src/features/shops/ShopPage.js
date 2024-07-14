import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useGetShopsQuery, selectShopById } from '../api/shopsSlice'
import { useGetDrugsQuery } from '../api/drugsSlice'
import DrugsShops from '../drugs/DrugsShops'
import { useSelector } from 'react-redux'

export const ShopPage = () => {
    const { shopId } = useParams()

    const shop = useSelector((state) => selectShopById(state, Number(shopId)))
    // const { shop, isLoading: isLoadingShop, isSuccess:isSuccessShop } = useGetShopsQuery('getShops', {
    //     selectFromResult: ({ data, isLoading, isSuccess }) => ({
    //         shop: data?.entities[shopId],
    //         isLoading,
    //         isSuccess
    //     }),
    // })
    // const { data:drugs, isLoading, isSuccess, isError, error } = useGetDrugsQuery('getDrugs')

    // let drugsList;
    // if (isLoading) {
    //   drugsList = <p>"Loading..."</p>;
    // } else if (isSuccess) {
    //   drugsList = drugs.ids.map(id => (
    //     <li key={id}>
    //       {drugs?.entities[id].name}
            {/* {drugs.entities[drugId].name}
            {drugs.entities[drugId].price}
            {drugs.entities[drugId].available_qty}
            {drugs.entities[drugId].shop_id} */}
        {/* </li>
    ))}  */}

  
  return (
    <div className='shopPage'>
        <div className='shopTitle'>{shop.name}</div>
        <div className='shopAdress'>{shop.adress}</div>

      <DrugsShops shopId={shopId}/>
    </div>

  )
}
