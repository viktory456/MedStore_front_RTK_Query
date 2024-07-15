import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { useGetShopsQuery, selectAllShops} from '../api/shopsSlice'
import { useGetMedsQuery, selectAllMeds} from '../api/medsSlice'
import ShopExtended from './ShopExtended';


const ShopsListExtended = () => {

    const shops = useSelector(selectAllShops)
    let contentShops;
    contentShops = shops.map(shopId => <ShopExtended key={shopId.id} shopId={shopId.id}/>)
    const meds = useSelector(selectAllMeds)
         
    return(

        <div className='shopsMenuExtended'>
            <h2 className='shopsTitle'>Shops:</h2>
            <ul className='shopsList'> {contentShops} </ul>
        </div>
    );
}

export default ShopsListExtended