import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import AccountNav from '@/components/AccountNav';
import Image from '@/components/Image';

function Places() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
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
                            className="flex gap-4 bg-gray-200 p-4 rounded-2xl cursor-pointer mb-4"
                        >
                            <div className="flex shrink-0 h-32 w-36">
                                {place.photos.length > 0 && (
                                    <Image
                                        className="object-cover w-full h-full"
                                        src={`${place.photos[0]}`}
                                        alt=""
                                    />
                                )}
                            </div>
                            <div className="">
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
