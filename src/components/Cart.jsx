import React from 'react'
import { CartContext } from '../context/CartContext'
import { useContext } from 'react'
import Modal from './Modal'
import { UserProgressContext } from '../context/UserProgressContext'
const Cart = () => {
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(UserProgressContext)
  const totalPrice = cartCtx.items.reduce((acc,cur)=>acc+cur.quantity*cur.price,0)
  
  function handleCloseButton(){
    userProgressCtx.hideCart()
  }
  function handleShowCheckout(){
    userProgressCtx.showCheckout()
  }

  function handleIncrease(item){
    cartCtx.addItem(item)
  }
  function handleReduce(id){
    cartCtx.removeItem(id)
  }
  return (
  <Modal className='cart' open={userProgressCtx.progress==='cart'} onClose={userProgressCtx.progress==='cart' ? handleCloseButton : null}>
    <h2>Your Cart</h2>
    <ul>
      {cartCtx.items.map(item=>
        <li key={item.id} className='cart-item'>
          <p>
            {item.name} - {item.quantity} x {item.price}
          </p>
          <p className='cart-item-actions'>
            <button onClick={()=>handleReduce(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={()=>handleIncrease(item)}>+</button>
          </p>
        </li>
      )}
    </ul>
    <p className='cart-total'>${totalPrice}</p>
    <p className='modal-actions'>
      <button className='text-button' onClick={handleCloseButton}>Close</button>
      {cartCtx.items.length>0 && <button className='button' onClick={handleShowCheckout}>Go to Checkout</button>}
    </p>

  </Modal>
  )
}

export default Cart