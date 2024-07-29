import { selectShopById} from '../api/shopsSlice'
import styled from "styled-components"
import { useSelector } from 'react-redux'
import {Box, Typography} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/joy/Link'

const StyledBox = styled(Box)`
  color: #1F273D;
  width:300px;
  height:200px;
  border: 1px solid #1F273D;
  border-radius: 10px;
    & .MuiTypography-root {
     color: #1F273D;
      font-size: 18px;
  }
  & :hover {
    background-color: #E9F5FF;
    cursor: pointer;
  }
`;

const BoxStyled = styled(Box)(() => ({
  color:'#1F273D',
  height:'200px',
  border:'1px solid #1F273D',
  borderRadius:'10px',
'&:hover': {
  backgroundColor: '#E9F5FF',
  cursor: 'pointer'
},
'& .MuiTypography-root': {
  color:'#1F273D',
  fontSize: '14px',
  padding:'10px'
}
}));

const ShopExtended = ({shopId}) => {
const shop = useSelector((state) => selectShopById(state, Number(shopId)))

  return (
    <BoxStyled sx={{width:{xs:'210px', sm:'300px'}}}>
      <Typography sx={{fontWeight:'900', fontSize:'16px'}}>{shop.title}</Typography>
      <Typography> {shop.adress} </Typography>
      <Typography>{'+38 555-55-55'}</Typography>
      <Typography><Link component={RouterLink} to={`${shopId}`} sx={{color:'#846C98'}}>{'See list of medicines  >>'}</Link> </Typography>
    </BoxStyled>
  )
}

export default ShopExtended