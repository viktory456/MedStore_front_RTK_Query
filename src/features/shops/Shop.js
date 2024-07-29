import { selectShopById} from '../api/shopsSlice'
import styled from "styled-components"
import { useContext } from "react"
import { ShopChosen } from '../mainPage/MainPage'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button'


const ChooseShopButton = styled(Button)(() => ({
  color: `#1F273D`,
  border: '1px solid #1F273D',
'&:hover': {
  backgroundColor: `#846C98`,
  color: `#FFFFFF`,
  border: `1px solid #846C98`,
}
}));


const Shop = ({shopId, setShop}) => {



const useShop = useContext(ShopChosen)
const shop = useSelector((state) => selectShopById(state, Number(shopId.id)))
const onShopChanged = () => { setShop(shopId.id)}

  return (
      <ChooseShopButton variant="outlined" onClick={onShopChanged} sx={{fontSize:{xs:'10px', md:'16px'}}}>
        {shop.title}
      </ChooseShopButton>
  )
}

export default Shop