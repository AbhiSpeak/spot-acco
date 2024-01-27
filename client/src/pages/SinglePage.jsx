import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../components/BookingWidget";

function SinglePage () {
    const {id} = useParams()
    const [place, setPlace] = useState(null)
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    useEffect(() => {
        if(!id)
            return
        axios.get('/places/'+id).then(response => {
            setPlace(response.data)
        })
    },[id])

    if(!place)
        return ''; 

    if(showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-white min-w-full min-h-screen">
                <div className="p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl">Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl bg-gray-200 shadow shadow-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        Close photos.
                        </button>
                    </div>
                    {place?.addedPhotos?.length > 0 && place.addedPhotos.map(photo => (
                        <div>
                            <img src={'http://localhost:4040/uploads/'+photo} alt='all photos' />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-gray-100 mt-4 -mx-8 px-8 pt-8">
            <h1 className="text-2xl">{place.title}</h1>
            <a className="flex gap-1 my-3 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q='+place.address}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            {place.address}</a>
            <div className="relative">
                <div className="grid rounded-3xl overflow-hidden gap-2 grid-cols-[2fr_1fr]">
                    <div>
                        {place.addedPhotos?.[0] && (
                            <div>
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4040/uploads/'+place.addedPhotos[0]} alt='place photo 1'/>
                            </div>
                        )}
                    </div>
                    <div className="grid">
                        {place.addedPhotos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4040/uploads/'+place.addedPhotos[1]} alt='place photo 2'/>
                        )}
                        <div className="overflow-hidden">
                            {place.addedPhotos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} className="cursor-pointer aspect-square object-cover" src={'http://localhost:4040/uploads/'+place.addedPhotos[2]} alt='place photo 3'/>
                            )}
                        </div>
                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} className="flex gap-2 absolute bg-white rounded-2xl shadow shadow-gray-500 bottom-0 right-0 px-4 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>


                    Show more photos</button>
            </div>
            
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