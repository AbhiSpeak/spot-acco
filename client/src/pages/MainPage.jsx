import axios from "axios"
import React, { useEffect, useState } from "react"

function MainPage () {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/allplaces').then(response => {
            setPlaces([...response.data, ...response.data, ...response.data, ...response.data])
            console.log(response)
        })
    }, [])
    return (
        <div className="mt-8 gap-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <div>
                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                        {place.addedPhotos?.[0] && (
                            <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4040/uploads/'+place.addedPhotos[0]} alt='place photo' />
                        )}
                    </div>
                    <h2 className="leading-4 font-bold" >{place.address}</h2>
                    <h3 className="text-gray-500 leading-4 text-sm truncate ">{place.title}</h3>
                    <div className="mt-1">
                        <span className="font-bold">${place.price}</span> per night
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MainPage