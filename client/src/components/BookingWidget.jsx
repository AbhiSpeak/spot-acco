import React from "react";

function BookingWidget ({place}) {
    return (
        <div className="bg-white shadow p-4 rounded-2xl">
                        <h2 className="text-2xl text-center">Price: ${place.price} / per night</h2>
                        <div className="flex">
                        <div className="my-4 border py-4 px-4 rounded-2xl">
                            <label>Check in: </label>
                            <input type='date' />
                        </div>
                        <div className="my-4 border border-l py-4 px-4 rounded-2xl">
                            <label>Check out: </label>
                            <input type='date' />
                        </div>
                        
                        </div>
                        <div className="my-4 border border-l py-4 px-4 rounded-2xl">
                            <label>Number of guests: </label>
                            <input type='number' value={1} />
                        </div>
                        <button className="loginBtn mt-4">Book this place</button>
                    </div>
    )
}

export default BookingWidget