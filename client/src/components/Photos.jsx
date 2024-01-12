import React, {useState} from "react";
import axios from "axios";
function Photos ({addedPhotos, onChange}) {

    
    const [photoLink, setPhotoLink] = useState('')

    async function addPhoto (e) {
        e.preventDefault();
        const {data:filename} = await axios.post('/uploadImage', {link: photoLink})
        
        onChange(prev => {
            return [...prev, filename];
        })
        setPhotoLink('')
    }

    async function uploadImage (e) {
        const files = e.target.files;
        const data = new FormData();
        for(let i = 0; i < files.length; i++) {
            data.append('images', files[i])
        }
        const {data:filenames} = await axios.post('/upload', data, {
            headers:{'Content-type': 'multipart/form-data'}
        })
        onChange(prev => {
            return [...prev, ...filenames];
        })

    }


    return (
        <>
            <div className="flex gap-2">
                <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder="Add using a link(make sure they image is of jpeg/jpg type." />
                <button onClick={addPhoto} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
            </div>

                        

            <div className="mt-2 grid gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="h-32 flex" key={link}>
                    <img className="rounded-2xl w-full object-cover position-center" src={'http://localhost:4040/uploads/'+link} alt='image' />
                    </div>
                ))}
                <label className="flex items-center justify-center gap-2 border bg-transparent rounded-2xl text-2xl text-gray p-2 cursor-pointer">
                <input type="file" multiple onChange={uploadImage} className="hidden" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    Upload&nbsp;images
                </label>
            </div>
        </>
    )
}

export default Photos