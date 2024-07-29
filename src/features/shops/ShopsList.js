import React from 'react'
import { useSelector } from "react-redux"
import { selectAllShops} from '../api/shopsSlice'
import Shop from './Shop'
import {Box, Typography, Stack} from '@mui/material'


const ShopsList = ({setShop}) => {

    const shops = useSelector(selectAllShops)
    let contentShops;
    contentShops = shops.map(shopId => <Shop setShop={setShop} key={shopId.id} shopId={shopId}/>)
         
    return(

        <Box sx={{padding: `15px`, border: `1px solid #1F273D`, borderRadius: `10px`, minWidth: `200px`, position: `fixed`}}>
          <Typography variant='h5' sx={{color:`#1F273D`, textAlign:"center", margin:{xs:'8px', md:'15px'}, fontSize:{xs:'14px', md:'16px'}}}>SHOPS:</Typography>
          <Stack direction={{xs:'row', md:'column'}} spacing={{ xs:1, md:4 }} useFlexGap flexWrap='wrap'>{contentShops}</Stack>
        </Box>

    );
}

export default ShopsList






