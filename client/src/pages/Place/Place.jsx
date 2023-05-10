import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Place() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then((response) => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return;

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-white min-h-screen">
                <button onClick={() => setShowAllPhotos(false)} className="fixed p-4 top-8 left-8 bg-transparent">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <div style={{ width: '720px' }} className="flex flex-col items-center m-auto mt-24 gap-2">
                    {place?.photos?.length > 0 &&
                        place.photos.map((photo, value) => (
                            <div key={value}>
                                <img className="object-cover" src={`http://localhost:4000/uploads/${photo}`} />
                            </div>
                        ))}
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4 bg-gray-100 -mx-20 px-20 py-8">
            <h1 className="text-3xl">{place.title}</h1>
            <a
                className="flex gap-1 font-semibold underline my-3"
                target="_blank"
                href={`http://maps.google.com/?q=${place.address}`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                </svg>

                {place.address}
            </a>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[1fr_1fr] rounded-2xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <img className="object-cover" src={`http://localhost:4000/uploads/${place.photos[0]}`} />
                        )}
                    </div>
                    <div className="grid gap-2 grid-cols-[1fr_1fr]">
                        <div className="grid">
                            <div className="overflow-hidden">
                                {place.photos?.[1] && (
                                    <img
                                        className="object-cover relative -top-1"
                                        src={`http://localhost:4000/uploads/${place.photos[1]}`}
                                    />
                                )}
                            </div>
                            <div className="overflow-hidden">
                                {place.photos?.[2] && (
                                    <img
                                        className="object-cover relative top-1"
                                        src={`http://localhost:4000/uploads/${place.photos[2]}`}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="grid">
                            <div className="overflow-hidden">
                                {place.photos?.[3] && (
                                    <img
                                        className="object-cover relative -top-1"
                                        src={`http://localhost:4000/uploads/${place.photos[3]}`}
                                    />
                                )}
                            </div>
                            <div className="overflow-hidden">
                                {place.photos?.[4] && (
                                    <img
                                        className="object-cover relative top-1"
                                        src={`http://localhost:4000/uploads/${place.photos[4]}`}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => setShowAllPhotos(true)}
                    className="flex gap-1 absolute bottom-2 right-2 px-4 py-2 bg-white rounded-xl shadow shadow-md shadow-gray-500 text-sm"
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
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                        />
                    </svg>
                    Show more photos
                </button>
            </div>
        </div>
    );
}

export default Place;
