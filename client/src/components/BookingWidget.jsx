import React, { useState } from "react";
import {differenceInCalendarDays} from 'date-fns'
import axios from "axios";
import { Navigate } from "react-router-dom";

function BookingWidget ({place}) {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guest, setGuest] = useState(1)

    const [name, setName] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [redirect, setRedirect] = useState('')

    let numberOfNights = 0;
    if(checkOut && checkIn ) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function handleBooking () {
        const data = {
            place: place._id, checkIn, checkOut, guest, name, mobile: mobileNo, price: numberOfNights*place.price}
        const res = await axios.post('/booking', data)

        const bookedId = res.data._id
        setRedirect(`/account/bookings/${bookedId}`)
    }

    if(redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
                        <h2 className="text-2xl text-center">Price: ${place.price} / per night</h2>
                        <div className="flex">
                        <div className="my-4 border py-4 px-4 rounded-2xl">
                            <label>Check in: </label>
                            <input 
                                type='date' 
                                value={checkIn} 
                                onChange={e => setCheckIn(e.target.value)} 
                            />
                        </div>
                        <div className="my-4 border border-l py-4 px-4 rounded-2xl">
                            <label>Check out: </label>
                            <input 
                                type='date' 
                                value={checkOut} 
                                onChange={e => setCheckOut(e.target.value)} 
                            />
                        </div>
                        
                        </div>
                        <div className="my-4 border border-l py-4 px-4 rounded-2xl">
                            <label>Number of guests: </label>
                            <input
                                type='number' 
                                value={guest} 
                                onChange={e => setGuest(e.target.value)} 
                            />
                        </div>
                        {numberOfNights > 0 && (
                            <>
                            <div className="my-4 border border-l py-4 px-4 rounded-2xl">
                                <label>Your Name: </label>
                                <input
                                    type='text' 
                                    value={name} 
                                    onChange={e => setName(e.target.value)} 
                                />
                            </div>
                            <div className="my-4 border border-l py-4 px-4 rounded-2xl">
                            <label>Your Mobile No: </label>
                            <input
                                type='tel' 
                                value={mobileNo} 
                                onChange={e => setMobileNo(e.target.value)} 
                            />
                        </div>
                        </>
                        )}
                        <button onClick={handleBooking} className="loginBtn mt-4">
                            Book this place
                            {numberOfNights > 0 && (
                                <span> (${numberOfNights * place.price})</span>
                            )}
                            
                            </button>
                    </div>
    )
}

export default BookingWidget