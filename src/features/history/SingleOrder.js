import React from 'react'
import { selectOrderById } from '../api/ordersSlice'
import { useSelector } from "react-redux"

export const SingleOrder = ({orderId}) => {

    const order = useSelector((state) => selectOrderById(state, Number(orderId.id)))
    const orderArray = JSON.parse(order.order)

    let totalOrder = 0;
    for (let i = 0; i < orderArray.length; i++) {
        totalOrder += orderArray[i].price*orderArray[i].quantity
    }

const orderList = orderArray.map(item => {
    return (
        <div>
            <div key={item.id} className='singleItem'>
                <div>{item.name}</div>
                <div>{item.quantity} pcs</div>
                <div>{item.price} uah</div>
            </div>
        </div>
    )
})

    return (
        <li key={orderId} className='alignOrder'>
            <div className='singleOrder'>{orderList}</div>
            <div>Total price: {totalOrder}</div>
            
        </li>

    )
}
