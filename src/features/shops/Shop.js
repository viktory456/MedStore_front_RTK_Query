import { useGetShopsQuery, selectShopById} from '../api/shopsSlice'
import { NavLink } from "react-router-dom"
import { useGetDrugsQuery} from '../api/drugsSlice'
import styled from "styled-components"
import { createContext, useContext, useEffect } from "react"
import { ShopChosen } from '../mainPage/MainPage'
import { useSelector } from 'react-redux'

const NavUnlisted = styled.ul`

  // display: flex;
  padding: 0;
  // width: 300px;
  // justify-content: center;
  // align-items: center;
  // column-gap: 35px;
  margin:0;

  a {
    text-decoration: none;
  }

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: darkslategrey;
    font-size: 1.3rem;
    list-style: none;
    width: 90%;
    height: 60px;
    text-align: center;
    line-height: 100%;
    border: 1px solid darkslategrey;
    border-radius: 10px;
    margin: 20px auto;
    background-color: white;
  }
  li:hover {
    background-color: antiquewhite;
    cursor: pointer;
  }
`;


const Shop = ({shopId, setShop}) => {

const useShop = useContext(ShopChosen)
const shop = useSelector((state) => selectShopById(state, Number(shopId.id)))
// console.log(shopId);
    // const { shop } = useGetShopsQuery('getShops', {
    //     selectFromResult: ({ data }) => ({
    //         shop: data?.entities[shopId]
    //     }),
    // })

const onShopChanged = () => {
  setShop(shopId.id)
}

  return (
    <NavUnlisted>
      <NavLink to={`/`}
        style={({ isActive}) => {
          return {
            fontWeight: isActive ? "bold" : "normal",
          };
        }
      }
      onClick={onShopChanged}
      ><li>{shop.name}</li></NavLink>
    </NavUnlisted>
  )
}

export default Shop