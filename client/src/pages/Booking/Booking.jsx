import { useInsertionEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import AddressLink from '@/components/AddressLink';
import PlaceGallery from '@/components/PlaceGallery';
import BookingDate from '@/components/BookingDate';

function Booking() {
    const { id } = useParams();
    const [booking, setBooking] = useState();

    useInsertionEffect(() => {
        if (id) {
            axios.get('/bookings').then((response) => {
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            });
        }
    }, [id]);

    if (!booking) {
        return '';
    }

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink children={booking.place.address} className="my-2" />
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center">
                <div>
                    <h2 className="text-xl mb-4">Your booking information:</h2>
                    <BookingDate booking={booking} />
                </div>
                <div className='bg-primary p-6 text-white rounded-2xl'>
                    <div>Total price</div>
                    <div className='text-3xl'>{booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    );
}

export default Booking;
