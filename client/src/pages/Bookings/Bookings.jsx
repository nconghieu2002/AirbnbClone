import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import AccountNav from '@/components/AccountNav';
import BookingDate from '@/components/BookingDate';
import Image from '@/components/Image';

function Bookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/bookings').then((response) => {
            setBookings(response.data);
        });
    }, []);

    const handleClear = async (bookingId) => {
        try {
            await axios.delete(`/bookings/${bookingId}`);
            const updatedBookings = bookings.filter((booking) => booking._id !== bookingId);
            setBookings(updatedBookings);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <AccountNav />
            <div className="gap-4 flex flex-col">
                {bookings?.length > 0 &&
                    bookings.map((booking, value) => (
                        <div key={value} className="relative">
                            <Link
                                to={`/account/bookings/${booking._id}`}
                                className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
                            >
                                <div className="w-48 h-40">
                                    {booking.place.photos.length > 0 && (
                                        <Image
                                            className="object-cover aspect-square w-full h-full"
                                            src={`${booking.place.photos[0]}`}
                                            alt=""
                                        />
                                    )}
                                </div>
                                <div className="py-3 pr-3 grow">
                                    <h2 className="text-2xl">{booking.place.title}</h2>
                                    <div className="text-xl">
                                        <BookingDate booking={booking} className="my-2 mt-4 text-gray-500" />
                                        <div className="flex items-center gap-1">
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
                                                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                                                />
                                            </svg>
                                            Total price: <div className="text-primary">${booking.price}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <button
                                onClick={() => handleClear(booking._id)}
                                className="absolute top-0 right-0 bg-transparent p-2"
                            >
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
                                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Bookings;
