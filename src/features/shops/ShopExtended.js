import { useGetShopsQuery, selectShopById} from '../api/shopsSlice'
import { NavLink } from "react-router-dom"
import styled from "styled-components";
import { useSelector } from 'react-redux'

const NavUnlisted = styled.li`

  list-style: none;
  width: 300px;
  height: 200px;
  border: 1px solid darkslategrey;
  border-radius: 10px;

  div, a{
    text-decoration: none;
    color: darkslategrey;
    font-size: 12px;
    
  }

//   li:hover {
//     background-color: antiquewhite;
//     cursor: pointer;
//   }
`;

const ShopExtended = ({shopId}) => {
const shop = useSelector((state) => selectShopById(state, Number(shopId)))

  return (
    <NavUnlisted>
            <div className='shopTitle'>{shop.title}</div>
            <div className='shopAdress'> {shop.adress} </div>
            <div className='shopPhone'>{'+38 555-55-55'}</div>
            <div className='medicinesList'><NavLink to={`${shopId}`}>{'See list of medicines  >>>'}</NavLink> </div>
    </NavUnlisted>
  )
}

export default ShopExtended