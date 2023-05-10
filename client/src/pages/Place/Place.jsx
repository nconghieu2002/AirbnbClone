import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
            <a className="" target='_blank' href={`http://maps.google.com/?q=${place.address}`}>
                {place.address}
            </a>
        </div>
    );
}

export default Place;
