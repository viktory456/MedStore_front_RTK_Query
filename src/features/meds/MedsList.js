import { selectAllDtS } from '../api/medsToShopsSlice'
import { selectAllMeds } from '../api/medsSlice'
import Med from "../meds/Med"
import { useMemo, useState, useEffect } from'react'
import { useSelector } from "react-redux"
import {Stack, Grid, Button } from '@mui/material'
import styled from "styled-components"


const SortingButtons = styled(Button)(() => ({
  border: '1px solid #846C98',
  color:`#846C98`,
'&:hover': {
  backgroundColor: '#FFFFFF',
}}));

export const MedsList = ({shop}) => {
  const [sortedList, setSortedList] = useState(false)
  const [selectedShop, setSelectedShop] = useState(shop)
  function comparePrices(a, b) {return a.price - b.price}
  let medsList;

  const meds = useSelector(selectAllMeds)
  const medsFav = meds.filter(med => med.favorite === true)
  const medsNonFav = meds.filter(med => med.favorite === false)
  const medsFavSorted = medsFav.sort(comparePrices)
  const medsNonFavSorted = medsNonFav.sort(comparePrices)

  const medsShops = useSelector(selectAllDtS)
  const medsChosen = useMemo(() => {
    let medsChosenList = []
    for(let i =0; i < meds.length; i++){
      if(meds[i].shop_id === shop){
        medsChosenList.push(meds[i])
      }
    }
    return medsChosenList
  }, [meds, medsShops, selectedShop])

  const medsChosenFav = medsChosen?.filter(med => med.favorite === true)
  const medsChosenNonFav = medsChosen?.filter(med => med.favorite === false)
  const medsChosenFavSorted = medsChosenFav.sort(comparePrices)
  const medsChosenNonFavSorted = medsChosenNonFav.sort(comparePrices)
  const sortedAllMeds = useMemo(() => {
    const copiedFavSortedMeds = medsFavSorted.slice()
    const copiedNonFavSortedMeds = medsNonFavSorted.slice()
    const sortedAllMeds = copiedFavSortedMeds.concat(copiedNonFavSortedMeds);
    return sortedAllMeds
  }, [meds])
  const sortedMedsChosen = useMemo(() => {
    const copiedChosenFavSortedMeds = medsChosenFavSorted.slice()
    const copiedChosenNonFavSortedMeds = medsChosenNonFavSorted.slice()
    const sortedMedsChosen = copiedChosenFavSortedMeds.concat(copiedChosenNonFavSortedMeds);
    return sortedMedsChosen
  }, [meds, medsShops, selectedShop])

  if(selectedShop === 'default'&&sortedList){
    medsList = sortedAllMeds.map(medId => <Med medId={medId} key={medId.id} />);
  }
  else if (selectedShop !== 'default'&&!sortedList) {
    medsList = medsChosen?.map(medId => <Med medId={medId} key={medId.id} />);
  } else if(selectedShop === 'default'&&!sortedList){
    medsList = meds?.map(medId => <Med medId={medId} key={medId.id} />);
  } else if (selectedShop !== 'default'&&sortedList) {
    medsList = sortedMedsChosen?.map(medId => <Med medId={medId} key={medId.id} />);
  }

  const sortByPrice = () => {setSortedList(true)}
  const resetSorting = () => {setSortedList(false)}
  const selectAllShops = () => {setSelectedShop('default')}
  useEffect(()=>{ setSelectedShop(shop) }, [shop])
  const heightCalc = `${Number(window.innerHeight)}`-200


  return (
    <Stack direction='row' sx={{paddingTop:{xs:'250px', md:'0px'}}}>
      <Grid container spacing={1} justifyContent={{xs:'space-between', md:'start'}} sx={{borderRadius:`10px`, paddingLeft:{xs:'0px', md:'200px'}, height:{xs:`${heightCalc}px`, md:`${window.innerHeight}px`}, overflowY: "auto"}}>{medsList}</Grid>

      <Stack direction='column' alignItems={{xs:'center'}} justifyContent={{xs:'center'}} spacing={1} sx={{position:`fixed`, right:{xs:'40px', sm:'50px', lg:'150px'}}}>
        <SortingButtons variant='outlined' sx={{fontSize:{xs:'8px', sm:'12px', md:'16px'}, padding:{xs:'3px', md:'15px'}}} onClick={sortByPrice}>Sort by Price</SortingButtons>
        <SortingButtons variant='outlined' sx={{fontSize:{xs:'8px', sm:'12px', md:'16px'}, padding:{xs:'3px', md:'15px'}}} onClick={resetSorting}>Reset Sorting</SortingButtons>
        <SortingButtons variant='outlined' sx={{fontSize:{xs:'8px', sm:'12px', md:'16px'}, padding:{xs:'3px', md:'15px'}}} onClick={selectAllShops}>All Shops</SortingButtons>
      </Stack>

    </Stack>
    )
}