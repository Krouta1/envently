"use client"
import { IEvent } from '@/lib/database/models/event.model';
import React, { useEffect } from 'react'
import { Button } from '../ui/button';
import {loadStripe} from "@stripe/stripe-js"
import { checkoutOrder } from '@/lib/actions/order.actions';

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

type CheckoutProps = {
    userId: string;
    event: IEvent;
}

const Checkout = ({userId,event}: CheckoutProps) => {



    const onCheckout =async () => {
        const order = {
            eventTitle:event.title,
            eventId:event._id,
            price:event.price,
            isFree: event.isFree,
            buyerId: userId
        }

        await checkoutOrder(order)
    }

    useEffect(() => {
      const query = new URLSearchParams(window.location.search)
      if(query.get("succes")){
        console.log("its a greate success")
      }

      if(query.get("canceled")){
        console.log("its a small cancel")
      }
    
    }, [])
    
  return (
    <form action={onCheckout} method='post'>
        <Button type='submit' role='link' size={"lg"} className='button sm:w-fit'>
            { event.isFree ? "Get ticket" : "Buy ticket"}
        </Button>
    </form>
  )
}

export default Checkout