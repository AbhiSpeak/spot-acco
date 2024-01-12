import React, {useState} from "react";
import Perks from "../components/Perks";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Photos from "../components/Photos";
import AccountNav from "../components/AccountNav";

function PlacesForm () {
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuest, setMaxGuest] = useState('')
    const [redirect, setRedirect] = useState(false)

    async function addNewPlace (e) {
        e.preventDefault();
        console.log({addedPhotos})
        const data = {title, address, addedPhotos, 
                        description, perks, extraInfo, 
                        checkIn, checkOut, maxGuest}
        await axios.post('/places', data)
        setRedirect(true)
    }
    if(redirect)
        return <Navigate to={'/account/places'} />


    return (
        <div>
            <AccountNav />
                    <form onSubmit={addNewPlace}>
                        <h2 className="text-2xl mt-4">Title</h2>
                        <p className="text-gray-500 text-sm">Give the title for your place.</p>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title" />


                        <h2 className="text-2xl mt-4">Address</h2>
                        <p className="text-gray-500 text-sm">Give the address of your place.</p>
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address" />


                        <h2 className="text-2xl mt-4">Photos</h2>
                        <p className="text-gray-500 text-sm">Give the photos of your place.</p>
                        
                        <Photos addedPhotos={addedPhotos} onChange={setAddedPhotos}/>


                        <h2 className="text-2xl mt-4">Description</h2>
                        <p className="text-gray-500 text-sm">Give the description for your place.</p>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} />

                        <h2 className="text-2xl mt-4">Perks</h2>
                        <p className="text-gray-500 text-sm">Select the perks for your place.</p>
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks selected={perks} onChange={setPerks}/>
                        </div>

                        <h2 className="text-2xl mt-4">Extra Info</h2>
                        <p className="text-gray-500 text-sm">Additional information regarding your place.</p>
                        <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />

                        <h2 className="text-2xl mt-4">Check In, Check Out, Guest Size</h2>
                        <p className="text-gray-500 text-sm">What's your check in and check out time and what's the limit for the guest size. </p>
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 mb-1">Check in time</h3>
                                <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder="12:00"/>
                            </div>

                            <div>
                                <h3 className="mt-2 mb-1">Check out time</h3>
                                <input type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder="18:00"/>
                            </div>

                            <div>
                                <h3 className="mt-2 mb-1 ">Guest Size</h3>
                                <input type="number" value={maxGuest} onChange={e => setMaxGuest(e.target.value)} placeholder="5"/>
                            </div>
                        
                        </div>
                        <button className="loginBtn">Save</button>
                        
                    </form>
                </div>
    )
}

export default PlacesForm