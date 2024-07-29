import React from 'react'
import { selectOrderById } from '../api/ordersSlice'
import { useSelector } from "react-redux"
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box} from '@mui/material'



export const SingleOrder = ({orderId}) => {

    const order = useSelector((state) => selectOrderById(state, Number(orderId.id)))
    const orderArray = JSON.parse(order.order)
    function ccyFormat(num) { return `${num.toFixed(2)}`}
    function priceRow(qty, unit) { return qty * unit}

    let totalOrder = 0;
    for (let i = 0; i < orderArray.length; i++) {
        totalOrder += orderArray[i].price*orderArray[i].quantity
    }

    const orderTable = () => {
        return (
            <Box key={order.id} className='singleItem'>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="order">

                      <TableHead>
                        <TableRow>
                          <TableCell align="left" colSpan={3}>
                            Order No {order.id}
                          </TableCell>
                          <TableCell align="right">Customer: {order.customerName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Medicine</TableCell>
                          <TableCell align="right">Qty</TableCell>
                          <TableCell align="right">Price</TableCell>
                          <TableCell align="right">Sum</TableCell>
                        </TableRow>
                      </TableHead>
            
                    <TableBody>
                      {orderArray.map((med) => (
                        <TableRow key={med.id}>
                          <TableCell>{med.name}</TableCell>
                          <TableCell align="right">{med.quantity}</TableCell>
                          <TableCell align="right">{med.price}</TableCell>
                          <TableCell align="right">{priceRow(med.price,med.quantity)}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2} fontWeight='bold'>Total</TableCell>
                        <TableCell align="right" fontWeight='bold'>{ccyFormat(totalOrder)}</TableCell>
                      </TableRow>
                    
                    </TableBody>
                    </Table>
                </TableContainer>             
        </Box>
    )
}

    return (
        <Box sx={{margin:'30px'}}>
            {orderTable()}
        </Box>
    )
}
