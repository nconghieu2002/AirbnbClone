import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';

import { UserContext } from '@/UserContext';

function BookingCard({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    const bookThisPlace = async () => {
        try {
            if (!checkIn || !checkOut || !name || !phone) {
                return;
            }

            const response = await axios.post('/bookings', {
                checkIn,
                checkOut,
                numberOfGuests,
                name,
                phone,
                price: numberOfNights * place.price,
                place: place._id
            });

            const bookingId = response.data._id;
            setRedirect(`/account/bookings/${bookingId}`);
        } catch (error) {
            setRedirect(`/login`);
        }
    };

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl flex-shrink-0">
            <div className="text-2xl text-center">Price: {place.price} / per night</div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-4 w-1/2">
                        <label>Check in:</label>
                        <br />
                        <input value={checkIn} onChange={(e) => setCheckIn(e.target.value)} type="date" />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label>Check out:</label>
                        <br />
                        <input value={checkOut} onChange={(e) => setCheckOut(e.target.value)} type="date" />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of guests:</label>
                    <input value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} type="number" />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Your full name:</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                        <label>Phone number:</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
                    </div>
                )}
            </div>
            <button onClick={bookThisPlace} className="primary mt-4">
                Book this place{numberOfNights > 0 && <span>$ {numberOfNights * place.price}</span>}
            </button>
        </div>
    );
}

export default BookingCard;
