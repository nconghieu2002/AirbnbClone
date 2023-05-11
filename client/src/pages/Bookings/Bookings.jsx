import { useEffect, useState } from 'react';
import axios from 'axios';

import AccountNav from '@/pages/AccountNav';

function Bookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/bookings').then((response) => {
            setBookings(response.data);
        });
    }, []);

    return (
        <div>
            <AccountNav />
            <div>
                {bookings?.length > 0 &&
                    bookings.map((booking, value) => (
                        <div key={value}>
                            {booking.checkIn} -&gt; {booking.checkOut}
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Bookings;
