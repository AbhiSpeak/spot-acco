import React, {useState} from "react"

function PlaceGallery ({place}) {

    const [showAllPhotos, setShowAllPhotos] = useState(false)
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
    )
}

export default PlaceGallery