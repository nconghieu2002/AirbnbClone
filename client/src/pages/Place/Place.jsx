import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingCard from '@/components/BookingCard';
import PlaceGallery from '@/components/PlaceGallery';
import AddressLink from '@/components/AddressLink';

function Place() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return;

    return (
        <div className="mt-4 bg-gray-100 -mx-20 px-20 py-8">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink children={place.address} className='my-3' />
            <PlaceGallery place={place} />
            <div className="mt-8 gap-16 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    <div>
                        Check in: {place.checkIn}
                        <br />
                        Check out: {place.checkOut}
                        <br />
                        Max number of guests: {place.maxGuests}
                    </div>
                    <div className="my-4">
                        <h2 className="font-semibold text-2xl">Extra info</h2>
                        <div className="mt-2 text-sm text-gray-700 leading-4">{place.extraInfo}</div>
                    </div>
                </div>
                <BookingCard place={place} />
            </div>
        </div>
    );
}

export default Place;
