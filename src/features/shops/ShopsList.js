import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { useGetShopsQuery, selectAllShops} from '../api/shopsSlice'
import Shop from './Shop';


const ShopsList = ({setShop}) => {

    const shops = useSelector(selectAllShops)
    let contentShops;
    contentShops = shops.map(shopId => <Shop setShop={setShop} key={shopId.id} shopId={shopId}/>)
         
    return(

        <div className='shopsMenu'>
          <h2 className='shopsTitle'>Shops:</h2>
          {contentShops}
        </div>

    );
}

export default ShopsList






