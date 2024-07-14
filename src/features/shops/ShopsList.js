import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { useGetShopsQuery, selectAllShops} from '../api/shopsSlice'
import Shop from './Shop';


const ShopsList = ({setShop}) => {

    // const { data:shops, isLoading:isLoadingShops, isSuccess:isSuccessShops, isError, error } = useGetShopsQuery('getShops')

    const shops = useSelector(selectAllShops)


    let contentShops;
    // if (isLoadingShops) {
    //   contentShops = <p>"Loading..."</p>;
    // } else if (isSuccessShops) {
      contentShops = shops.map(shopId => <Shop setShop={setShop} key={shopId.id} shopId={shopId}/>)
    // } 

 
        
    return(
      // <div className='sticky'>
        <div className='shopsMenu'>
          <h2 className='shopsTitle'>Shops:</h2>
          {contentShops}
        </div>
      // </div>



    );
}

export default ShopsList






