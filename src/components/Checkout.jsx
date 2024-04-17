import React, { useContext } from 'react'
import Modal from './Modal'
import { CartContext } from '../context/CartContext'
import { UserProgressContext } from '../context/UserProgressContext'
import useHttp from '../hooks/useHttp'
import Error from './Error'
const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
    }
}
const Checkout = () => {
    const cartCtx = useContext(CartContext)
    const totalPrice = cartCtx.items.reduce((acc,cur)=>acc+cur.quantity*cur.price,0)
    const userProgressCtx = useContext(UserProgressContext)

    const {data,isLoading:isSending,error, sendRequest,clearData} = useHttp('http://localhost:3000/orders/',requestConfig)
    function handleClose(){
        userProgressCtx.hideCheckout()
    }
    function handleFinish(){
        userProgressCtx.hideCheckout()
        cartCtx.clearCart()
        clearData()
    }
    function handleSubmit(event){
        event.preventDefault()
        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries())
        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        )

    }
    let actions = (
        <p className='modal-actions'>
            <button className='text-button' onClick={handleClose} type='button'>Close</button>
            <button className='button' type='submit'>Submit Order</button>
        </p>
    )
    if (isSending){
        actions = (<p className='modal-actions'>Sending other data...</p>)
    }
    if (data && !error){
        return (
            <Modal open={userProgressCtx.progress==='checkout'} onClose={handleFinish}>
                <h2>Success</h2>
                <p>Your order was submitted successfully.</p>
                <p>We will get back to you with more details via email within the next few minutes</p>
                <p className='modal-actions'>
                    <button onClick={handleFinish} className='button'>Okay</button>
                </p>
            </Modal>
        )
    }
    return (
        <Modal className='' open={userProgressCtx.progress==='checkout'}>
            <form action="" onSubmit={(e)=>handleSubmit(e)}>
                <h2>Checkout</h2>
                <p>Total amount: {totalPrice}</p>

                <p className='control'>
                    <label htmlFor='name'>Full Name</label>
                    <input type="text" id='name' name='name' required/>
                </p>
                <p className='control'>
                    <label htmlFor='email'>E-Mail Address</label>
                    <input type="email" id='email' name='email' required/>
                </p>
                <p className='control'>
                    <label htmlFor='street'>Street</label>
                    <input type="text" id='street' name='street' required/>
                </p>
                <div className='control-row'>
                    <p className='control'>
                        <label htmlFor="postal-code">Postal Code</label>
                        <input type='text' id='postal-code' name='postal-code' required/>
                    </p>
                    <p className='control'>
                        <label htmlFor="city">City</label>
                        <input type='text' id='city' name='city' required/>
                    </p>
                </div>
                {error && <Error title='Could not send the data' message={error}></Error>}
                {actions}

            </form>
        </Modal>
    )
}

export default Checkout