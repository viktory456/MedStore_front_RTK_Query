import { MedsList } from '../meds/MedsList'
import ShopsList from "../shops/ShopsList"
import { createContext, useState } from "react"
import Stack from '@mui/material/Stack'


const ShopChosen = createContext('hello');

export const MainPage = (props) => {

  const [shop, setShop] = useState('default');
  const [byPrice, setByPrice] = useState(false);
  const sortPrice = () => { setByPrice(true) }

 return (
  <ShopChosen.Provider value={shop}>
      <Stack direction={{xs:'column', md:'row'}} spacing={{ xs:1, sm:2 }} sx={{height:'100vh'}}>
        <ShopsList setShop={setShop}/>
        <MedsList shop={shop} byPrice={byPrice}/>
      </Stack>
   </ShopChosen.Provider>
  );
}

export {ShopChosen}
