import {AppBar, Box, CssBaseline, IconButton, Toolbar, Stack, Divider, Link} from '@mui/material'
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid'
import { Link as RouterLink } from 'react-router-dom'
import { createContext } from "react"



const ShopChosen = createContext('hello');

export const Header = () => {

  return (
    <Box>
    <CssBaseline />
      <AppBar sx={{ bgcolor:'#846C98' }} component="nav">
        <Toolbar>
          <Link variant='h5' component={RouterLink} color='#fff' underline="none" to={"/"}>
            <IconButton color="inherit" size="large" sx={{ mr: 3 }}>
              <MedicationLiquidIcon />
            </IconButton>
          </Link>
          <Stack direction="row" divider={<Divider orientation="vertical" flexItem sx={{bgcolor: 'white'}}/>} spacing={2}>
            <Link component={RouterLink} sx={{'&:hover': {fontWeight: {xs:'regular', md:'regular', lg:'bold'}}, fontSize:{xs:'12px', md:'16px'}, marginLeft:{xs:'8px', md:'16px'}, color:'#fff'}} underline="none" to={"/"}>HOME</Link>
            <Link component={RouterLink} sx={{'&:hover': {fontWeight: {xs:'regular', md:'regular', lg:'bold'}}, fontSize:{xs:'12px', md:'16px'}, marginLeft:{xs:'8px', md:'16px'}, color:'#fff'}} underline="none" to={"/shops"}>SHOPS</Link>
            <Link component={RouterLink} sx={{'&:hover': {fontWeight: {xs:'regular', md:'regular', lg:'bold'}}, fontSize:{xs:'12px', md:'16px'}, marginLeft:{xs:'8px', md:'16px'}, color:'#fff'}} underline="none" to={"/cart"}>SHOPPING CART</Link>
            <Link component={RouterLink} sx={{'&:hover': {fontWeight: {xs:'regular', md:'regular', lg:'bold'}}, fontSize:{xs:'12px', md:'16px'}, marginLeft:{xs:'8px', md:'16px'}, color:'#fff'}} underline="none" to={"/history"}>HISTORY</Link>
            <Link component={RouterLink} sx={{'&:hover': {fontWeight: {xs:'regular', md:'regular', lg:'bold'}}, fontSize:{xs:'12px', md:'16px'}, marginLeft:{xs:'8px', md:'16px'}, color:'#fff'}} underline="none" to={"/coupons"}>COUPONS</Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export {ShopChosen}
