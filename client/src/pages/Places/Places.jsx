import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import AccountNav from '@/pages/AccountNav';

function Places() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/places').then(({ data }) => {
            setPlaces(data);
        });
    }, []);

    return (
        <div>
            <AccountNav />
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
            <div className="mt-4">
                {places.length > 0 &&
                    places.map((place) => (
                        <Link
                            to={`/account/places/${place._id}`}
                            key={place._id}
                            className="flex gap-4 bg-gray-200 p-4 rounded-2xl cursor-pointer"
                        >
                            <div className="flex w-44 h-28">
                                {place.photos.length > 0 && (
                                    <img className='object-cover' src={`http://localhost:4000/uploads/${place.photos[0]}`} alt="" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl">{place.title}</h2>
                                <p className="text-sm mt-2">{place.description}</p>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}

export default Places;
