import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";

function SinglePage () {
    const {id} = useParams()
    const [place, setPlace] = useState(null)
    

    useEffect(() => {
        if(!id)
            return
        axios.get('/places/'+id).then(response => {
            setPlace(response.data)
        })
    },[id])

    if(!place)
        return ''; 

    

    return (
        <div className="bg-gray-100 mt-4 -mx-8 px-8 pt-8">
            <h1 className="text-2xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place}/>
            
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="semi-bold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check in: {place.checkIn}<br />
                    Check out: {place.checkOut} <br />
                    Maximum number of guests: {place.maxGuest}
                    
                    
                </div>
                <div>
                    <BookingWidget place={place}/>
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className="font semi-bold text-2xl">Extra Info</h2>
                </div>
                <div className="text-sm text-gray-700 leading-5 mb-4 mt-2">
                    {place.extraInfo}
                </div>
            </div>
            
        </div>

        
    )
}

export default SinglePage