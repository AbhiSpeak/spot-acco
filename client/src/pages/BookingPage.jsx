import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BoookingDates";

function BookingPage () {
    const {id} = useParams()
    const [booking, setBooking] = useState(null)
    useEffect(() => {
        if(id) {
            axios.get('/booking').then(res => {
                const foundBooking = res.data.find(({_id}) => _id === id)
                if(foundBooking)
                    setBooking(foundBooking)
            })
        }
    },[id])
    if(!booking)
        return 'no'
    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink>{booking.place.address}</AddressLink>
            <div className="flex justify-between bg-gray-200 p-4 mb-4 rounded-2xl">
            <div>
                <h2 className="text-l">Your booking information</h2>
                <BookingDates booking={booking} />
            </div>
            <div>
                <div>Total Price</div>
                <div className="text-3xl">${booking.price}</div>
            </div>
            </div>
            <PlaceGallery place={booking.place} />
            
        </div>
    )
}

export default BookingPage