import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Image from '@/components/Image';

function Home() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        axios.get('places').then((response) => {
            setPlaces(response.data);
        });
    }, []);

    return (
        <div className="gap-x-6 gap-y-8 mt-8 grid grid-cols-3 sm:grid-cols-2  lg:grid-cols-4">
            {places.length > 0 &&
                places.map((place) => (
                    <Link to={`/place/${place._id}`} key={place._id}>
                        <div className="bg-gray-500 rounded-2xl flex mb-2">
                            {place.photos?.length > 0 && (
                                <Image
                                    className="object-cover aspect-square rounded-2xl"
                                    src={place.photos[0]}
                                    alt=""
                                />
                            )}
                        </div>
                        <h3 className="text-sm font-bold truncate">{place.address}</h3>
                        <h2 className="text-sm text-gray-500 truncate">{place.title}</h2>
                        <div className="mt-1">
                            <span className="font-bold">${place.price}</span> per night
                        </div>
                    </Link>
                ))}
        </div>
    );
}

export default Home;
