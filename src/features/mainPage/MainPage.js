import { useGetDrugsShopsQuery} from '../api/drugsToShopsSlice'
import { useGetShopsQuery} from '../api/shopsSlice'
import { useGetDrugsQuery, selectAllDrugs} from '../api/drugsSlice'
import { useSelector } from "react-redux";
// import Drug from "../drugs/Drug"
import { DrugsList } from '../drugs/DrugsList'
import ShopsList from "../shops/ShopsList"
import { createContext, useContext, useState } from "react"


const ShopChosen = createContext('hello');

export const MainPage = () => {

  // const { data:drugs, isLoading, isSuccess} = useGetDrugsQuery('getDrugs')

  const drugs = useSelector(selectAllDrugs)

  const [shop, setShop] = useState('default');
  const [byPrice, setByPrice] = useState(false);
  const sortPrice = () => {
    setByPrice(true)
    // console.log(byPrice);
  }

  return (
    <ShopChosen.Provider value={shop}>
    <div className='mainPage'>
        <ShopsList setShop={setShop}/>

        <DrugsList shop={shop} byPrice={byPrice}/>

    </div>
    </ShopChosen.Provider>
  )
}

export {ShopChosen}
