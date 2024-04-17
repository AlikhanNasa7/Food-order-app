import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
const MealsItem = ({image,name, price,description,id}) => {
  const cartCtx = useContext(CartContext)

  function handleAddMealToCart(){
    const meal = {image,name,price,description,id}
    cartCtx.addItem(meal)
  }
  return (
    <li className='meal-item'>
        <article>
            <img src={`http://localhost:3000/${image}`} alt="food-picture" />
            <div>
                <h3>{name}</h3>
                <p className='meal-item-price'>${price}</p>
                <p className='meal-item-description'>{description}</p>
                <button className='meal-item-actions button' onClick={handleAddMealToCart}>Add to Cart</button>
            </div>
        </article>
    </li>
  )
}

export default MealsItem