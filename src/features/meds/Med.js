import { selectMedById, selectAllMeds, useAddFavoriteMutation} from '../api/medsSlice'
import {useAddToCartMutation, selectAllCart} from '../api/cartSlice'
import {Buffer} from "buffer" 
import { useState } from 'react'
import { selectAllShops, selectShopById } from '../api/shopsSlice'
import { StarEmpty, StarSolid } from './Favorites'
import { useSelector } from 'react-redux'
import styled from "styled-components"
import {Stack, Grid, Typography, Box, Button} from '@mui/material'

const QtyButtons = styled(Button)(() => ({
        fontSize:'16px',
        minWidth:`25px`, 
        color:`#846C98`,
    '&:hover': {
        backgroundColor: '#FFFFFF',
        fontWeight: 'bold',
    }}));

const Med = ({medId}) => {

    const [addFavorite, {isLoading:isLoadingAddFav}] = useAddFavoriteMutation()
    const meds = useSelector(selectAllMeds)
    const med = useSelector((state) => selectMedById(state, Number(medId.id)))
    const cart = useSelector(selectAllCart)
    let startingQty = 1;
    for(let i =0; i < cart.length; i++){
        if(cart[i].shop == med.shop_id && cart[i].name == med.name){
            startingQty = Number(cart[i].quantity)
        }
    }
    const [quantity, setQuantity] = useState(startingQty)
    const qtyDecrease = () => {
        if (quantity === 1) {return}
        setQuantity(quantity - 1)
    }
    const qtyIncrease = () => setQuantity(quantity + 1)
    const shops = useSelector(selectAllShops)
    const shop = useSelector((state) => selectShopById(state, Number(med?.shop_id)))
    const [favorite, setFavorite] = useState(med?.favorite)
    const base64 = Buffer.from(med?.img.data, "binary" ).toString("base64");
    const idInCart = `${med?.id}${new Date().getTime()}`
    const [addToCart, { isLoading }] = useAddToCartMutation()
    const onAddItemClicked = async () => {
        if (!isLoading) {
            try {
                await addToCart({ id: idInCart, name: med?.name, shop: med?.shop_id, quantity: quantity, price: med?.price }).unwrap()
            } catch (err) {
                console.error('Failed to add the item', err)
            }
        }
    }
    const toggleFav = () => {
        setFavorite(!favorite)
        if(!isLoadingAddFav){
            addFavorite(Number(medId.id)).unwrap()
        }
    }

  return (
    <Grid item xs={8} lg={4} sx={{position:'relative', padding:{xs:'8px', md:'16px'}, border: `1px solid #1F273D`, borderRadius: `10px`, margin: `8px`}}>
        <Stack direction="column" spacing={1}>
            <Box sx={{position:'absolute', right:{xs:'5px', md:'16px'}, top:{xs:'5px', md:'16px'}}} onClick={toggleFav}>
                {favorite ? <StarSolid /> : <StarEmpty />}
            </Box>
            <Grid container spacing={0} justifyContent="center" alignItems='center'> <Box component="img" sx={{height: 150, width: 130}} src={`data:image/png;base64,${base64}`}/></Grid>

            <Stack direction='row' alignItems='center' justifyContent='space-evenly' sx={{color: `#1F273D`}}>
                <Box sx={{width:`120px`, fontWeight:`bold`, display:'flex', justifyContent:'center'}}>{med.name}</Box>
                <Box sx={{alignItems:"center", display:{xs:'none', sm:'block'}}}>{`${med.price}`}</Box>
                <Box display={{xs:'none', sm:'none', md:'none', lg:'flex'}} alignItems='center' justifyContent='center' width={150} sx={{fontWeight: `bold`}}>{shop?.title}</Box>
                <Stack direction='row' justifyContent='center' alignItems='center' sx={{display:{xs:'none', sm:'flex'}}}>
                    <QtyButtons sx={{minWidth:`25px`, color:`#846C98`}} onClick={qtyDecrease}>{'-'}</QtyButtons>
                    <Typography sx={{fontStyle:`bold`}}>{quantity}</Typography>
                    <QtyButtons sx={{minWidth:`25px`, color:`#846C98`}} className='qtyButton' onClick={qtyIncrease}>{'+'}</QtyButtons>
                </Stack>
                <Button sx={{minWidth:{xs:'20px', md:'60px'}, height:{xs:'20px', md:'40px'}, border:'1px solid #1F273D', borderRadius:{xs:'5px', md:'10px'}, color:'#1F273D', padding:{xs:'3px', md:'6px 8px'}, fontSize:{xs:'10px', md:'16px'}}} type="button" onClick={onAddItemClicked}>{'Buy'}</Button>
            </Stack>
        </Stack>
    </Grid>
  )
}

export default Med 