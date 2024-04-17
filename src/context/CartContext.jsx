import { createContext, useReducer } from "react";

export const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem : (id) => {},
    clearCart:()=>{}
})

function cartReducer(state, action){
    if (action.type==='ADD_ITEM'){
        const cartItemIndex = state.items.findIndex(item=>item.id===action.item.id)
        const updatedItems = [...state.items]
        if (cartItemIndex!=-1){
            const updatedItem = {...state.items[cartItemIndex],quantity: state.items[cartItemIndex].quantity+1}
            updatedItems[cartItemIndex] = updatedItem
        }else{
            updatedItems.push({...action.item, quantity:1})
        }

        return {
            ...state,
            items: updatedItems
        }
    }else if (action.type==='REMOVE_ITEM'){
        const cartItemIndex = state.items.findIndex(item=>item.id===action.id)
        let updatedItems = [...state.items]

        if (updatedItems[cartItemIndex].quantity!==1){
            const updatedItem = {
                ...updatedItems[cartItemIndex],
                quantity: updatedItems[cartItemIndex].quantity-1
            }
            updatedItems[cartItemIndex] = updatedItem
        }else{
            updatedItems = updatedItems.filter(item=>item.id!==action.id)
        }

        return {
            ...state,
            items: updatedItems
        }
    }else if (action.type==='CLEAR_CART'){
        return {
            ...state, items: []
        }
    }
}

export function CartContextProvider({children}){

    const [cart, dispatchCartActions] = useReducer(cartReducer, {items:[]})
    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    }
    function addItem(item){
        dispatchCartActions({type:'ADD_ITEM',item:item})
    }
    function removeItem(id){
        dispatchCartActions({type: 'REMOVE_ITEM',id: id})
    }

    function clearCart(){
        dispatchCartActions({type:'CLEAR_CART'})
    }
    
    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}