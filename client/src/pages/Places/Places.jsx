import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Perks from '@/components/Perks';

function Places() {
    const { action } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

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

    const addPhotoByLink = async (e) => {
        e.preventDefault();
        await axios.post('/upload-by-link', { link: photoLink });
    };

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link
                        to={'/account/places/new'}
                        className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'Title for your place, should be short and catchy as in advertisement')}
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="title, for example: My lovely apt"
                        />
                        {preInput('Address', 'Address to this place')}
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="address"
                        />
                        {preInput('Photos', 'More = better')}
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={photoLink}
                                onChange={(e) => setPhotoLink(e.target.value)}
                                placeholder="Add using a link ...jpg"
                            />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">
                                Add&nbsp;photo
                            </button>
                        </div>
                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            <button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                    />
                                </svg>
                                Upload
                            </button>
                        </div>
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
            )}
        </div>
    );
}

export default Places;
