import React from 'react'
import { useParams } from 'react-router-dom'
import {  selectShopById } from '../api/shopsSlice'
import MedsShops from '../meds/MedsShops'
import { useSelector } from 'react-redux'
import {Stack, Box} from '@mui/material'

export const ShopPage = () => {

    const { shopId } = useParams()
    const shop = useSelector((state) => selectShopById(state, Number(shopId)))

    return (
    <Stack direction='column' spacing={3} color='#1F273D'>
        <Box sx={{fontWeight:'bold'}}>{shop.title}</Box>
        <Box>{shop.adress}</Box>
        <MedsShops shopId={shopId}/>
    </Stack>

  )
}
