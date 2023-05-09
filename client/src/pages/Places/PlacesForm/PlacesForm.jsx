import { useState } from 'react';
import axios from 'axios';

import Perks from '@/components/Perks';
import PhotosUploader from '@/components/PhotosUploader';
import AccountNav from '@/pages/AccountNav';
import { Navigate } from 'react-router-dom';

function PlacesForm() {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);

    const inputHeader = (text) => {
        return <h2 className="text-2xl mt-4">{text}</h2>;
    };

    const inputDescription = (text) => {
        return <p className="text-sm text-gray-500">{text}</p>;
    };

    const preInput = (header, description) => {
        return (
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
            </div>
        );
    };

    const addNewPlace = async (e) => {
        e.preventDefault();
        const placeData = { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests };
        await axios.post('/places', placeData);
        setRedirect(true);
    };

    if (redirect) {
        return <Navigate to={'/account/places'} />;
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={addNewPlace}>
                {preInput('Title', 'Title for your place, should be short and catchy as in advertisement')}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title, for example: My lovely apt"
                />
                {preInput('Address', 'Address to this place')}
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="address" />
                {preInput('Photos', 'More = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Description', 'Description of the place')}
                <textarea rows="5" value={description} onChange={(e) => setDescription(e.target.value)} />
                {preInput('Perks', 'Select all the perks of your place')}
                <Perks selected={perks} onChange={setPerks} />
                {preInput('Extra info', 'House rules, etc')}
                <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />
                {preInput(
                    'Check in&out times',
                    'Add check in and out times, remember to have some time window for cleaning the room between guests'
                )}
                <div className="grid grid-cols-3 gap-2">
                    <div>
                        <h3 className="mt-2 -mb-1">Check in time</h3>
                        <input
                            type="text"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            placeholder="14:00"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check out time</h3>
                        <input
                            type="text"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            placeholder="12:00"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max number of guests</h3>
                        <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
                    </div>
                </div>
                <button className="primary mt-4">Save</button>
            </form>
        </div>
    );
}

export default PlacesForm;
