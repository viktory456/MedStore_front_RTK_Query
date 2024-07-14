import ShopsList from "../shops/ShopsList"
import { useGetDrugsShopsQuery, selectDtSById, selectAllDtS} from '../api/drugsToShopsSlice'
import { useGetDrugsQuery, useGetDrugsByPriceQuery, selectAllDrugs, selectAllDrugsByPrice} from '../api/drugsSlice'
import Drug from "../drugs/Drug"
import { useMemo, useState, useEffect } from'react'
import { useSelector } from "react-redux"

export const DrugsList = ({shop}) => {
  const [sortedList, setSortedList] = useState(false)
  const [selectedShop, setSelectedShop] = useState(shop)
  let drugsList;
  const drugs = useSelector(selectAllDrugs)
  const drugsShops = useSelector(selectAllDtS)
  const drugsChosen = drugsShops.filter(item =>item.shopId ===shop);
  const sortedDrugs = useMemo(() => {
    const sortedDrugs = drugs.slice()
    function comparePrices(a, b) {
      return a.price - b.price;
    }
    sortedDrugs.sort(comparePrices)
    const sortedArrFav = sortedDrugs.reduce((acc, element) => {
      if (element.favorite === true) {
        return [element, ...acc];
      }
      return [...acc, element];
    }, []);
    return sortedArrFav
  }, [drugs])
  const sortedDrugsChosen = useMemo(() => {
    const sortedDrugsChosen = drugsChosen.slice()
    function comparePrices(a, b) {
      return a.price - b.price;
    }
    sortedDrugsChosen.sort(comparePrices)
    return sortedDrugsChosen
  }, [drugsChosen])

    if(selectedShop === 'default'&&sortedList){
      drugsList = sortedDrugs.map(drugId => <Drug drugId={drugId} key={drugId.id} />);
    }
    else if (selectedShop !== 'default'&&!sortedList) {
      drugsList = drugsChosen?.map(drugId => <Drug drugId={drugId} key={drugId.id} />);
    } else if(selectedShop === 'default'&&!sortedList){
      drugsList = drugs?.map(drugId => <Drug drugId={drugId} key={drugId.id} />);
    } else {
      drugsList = sortedDrugsChosen.map(drugId => <Drug drugId={drugId} key={drugId.id} />);
    }

  const sortByPrice = () => {
    setSortedList(true)
}
const resetSorting = () => {
  setSortedList(false)
}
const selectAllShops = () => {
  setSelectedShop('default')
}
useEffect(()=>{
  setSelectedShop(shop)
}, [shop])

  return (
    <>
      <div className='drugsMenu'>
        {drugsList}
      
      </div>
      <button className='buyButton' onClick={sortByPrice}>Sort by Price</button>
      <button className='buyButton' onClick={resetSorting}>Reset Sorting</button>
      <button className='buyButton' onClick={selectAllShops}>Select All Shops</button>
    </>
    )
}