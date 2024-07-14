import { NavLink } from "react-router-dom"
import ShopsList from "../features/shops/ShopsList"
import styled from "styled-components";

const NavUnlisted = styled.ul`

  display: flex;
  padding: 0;
  // width: 300px;
  justify-content: left;
  align-items: center;
  column-gap: 35px;

  a {
    text-decoration: none;
  }

  li {
    color: darkslategrey;
    font-size: 1.3rem;
    position: relative;
    list-style: none;
  }

  .current {
    li {
      border-bottom: 2px solid black;
    }
  }
`;

const Header = () => {
    return (
        <header className="header">
            <NavUnlisted>
                    <NavLink to="/" 
                      style={({ isActive}) => {
                        return {
                          fontWeight: isActive ? "bold" : "normal",
                        };
                      }}
                      ><li>Home</li></NavLink>
                    <div className="vl"></div>
                    <NavLink to="/shops" 
                      style={({ isActive}) => {
                        return {
                          fontWeight: isActive ? "bold" : "normal",
                        };
                      }}
                      ><li>Shops</li></NavLink>
                    <div className="vl"></div>
                    <NavLink to="cart"
                      style={({ isActive}) => {
                        return {
                          fontWeight: isActive ? "bold" : "normal",
                        };
                      }}
                    ><li>Shopping Cart</li></NavLink>
                    <div className="vl"></div>
                    <NavLink to="history"
                      style={({ isActive}) => {
                        return {
                          fontWeight: isActive ? "bold" : "normal",
                        };
                      }}
                    ><li>History</li></NavLink>
                    <div className="vl"></div>
                    <NavLink to="coupons"
                      style={({ isActive}) => {
                        return {
                          fontWeight: isActive ? "bold" : "normal",
                        };
                      }}
                    ><li>Coupons</li></NavLink>

            </NavUnlisted>
            
        </header>
    )
}

export default Header