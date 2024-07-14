import React, {useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { useGetShopsQuery, selectAllShops} from '../api/shopsSlice'
import { useGetDrugsQuery, selectAllDrugs} from '../api/drugsSlice'
import ShopExtended from './ShopExtended';
// import Shop from './Shop';


const ShopsListExtended = () => {

    // const { data:shops, isLoading:isLoadingShops, isSuccess:isSuccessShops, isError, error } = useGetShopsQuery('getShops')
    const shops = useSelector(selectAllShops)

    let contentShops;
    // if (isLoadingShops) {
    //   contentShops = <p>"Loading..."</p>;
    // } else if (isSuccessShops) {
      contentShops = shops.map(shopId => <ShopExtended key={shopId.id} shopId={shopId.id}/>)
    // } 

    // const { data:drugs, isLoading:isLoadingDtS, isSuccess:isSuccessDtS} = useGetDrugsQuery('getDrugs')
    const drugs = useSelector(selectAllDrugs)

    // let drugsList;
    // if (isLoadingDtS) {
    //     drugsList = <p>"Loading..."</p>;
    // } else if (isSuccessDtS) {
        // drugsList = drugs.ids.map(drugId => 

        //     console.log(drugs.entities[drugId])

        // )
        // console.log(drugs);//only the last one is shown
    // } 
  
 
        
    return(

        <div className='shopsMenuExtended'>
          <h2 className='shopsTitle'>Shops:</h2>
            <ul className='shopsList'>
                {contentShops}
            </ul>

        </div>


    );
}

export default ShopsListExtended