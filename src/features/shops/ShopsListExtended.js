import React from 'react'
import { useSelector } from "react-redux"
import { selectAllShops} from '../api/shopsSlice'
import { selectAllMeds} from '../api/medsSlice'
import ShopExtended from './ShopExtended'
import {Box, Typography, Grid} from '@mui/material'

const ShopsListExtended = () => {

    const shops = useSelector(selectAllShops)
    let contentShops;
    contentShops = shops.map(shopId => <Grid item key={shopId.id}> <ShopExtended key={shopId.id} shopId={shopId.id}/></Grid>)
    const meds = useSelector(selectAllMeds)
         
    return(

        <Box >
            <Typography variant='h5' sx={{color:'#1F273D', marginBottom:'20px'}}>Shops:</Typography>
            <Grid container spacing={2} justifyContent='space-evenly'> {contentShops} </Grid>
        </Box>
    );
}

export default ShopsListExtended