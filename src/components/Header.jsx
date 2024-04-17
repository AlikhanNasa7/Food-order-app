import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { UserProgressContext } from '../context/UserProgressContext'
const Header = () => {
  const cartCtx = useContext(CartContext)
  const totalItems = cartCtx.items.reduce((acc,cur)=>acc+cur.quantity,0)
  const userProgressCtx = useContext(UserProgressContext)
  function handleCartOpen(){
    userProgressCtx.showCart()
  }
  return (
    <div id='main-header'>
        <div id='title'>
            <img src="/src/assets/logo.jpg" alt="logo_icon" />
            <h1>REACTFOOD</h1>
        </div>
        <button className='button' onClick={handleCartOpen}>Cart ({totalItems})</button>
    </div>
  )
}

export default Header