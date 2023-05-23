import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [inputOpen, setInputOpen] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setInputOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            handleSearch();
        }, 300);

        return () => {
            clearTimeout(delaySearch);
        };
    }, [searchValue]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/search?searchValue=${searchValue}`);
            setSearchResults(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleInput = () => {
        setInputOpen((prevInputOpen) => !prevInputOpen);
    };

    return (
        <div className="relative">
            <div
                onClick={toggleInput}
                className="flex items-center gap-2 border border-gray-300 rounded-full px-4 shadow-md shadow-gray-300 hover:shadow-gray-400 transition-shadow duration-500"
            >
                <input
                    ref={inputRef}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    type="text"
                    placeholder="Anywhere"
                    className="text-primary border-none outline-none"
                />
                <button className="p-2 bg-primary text-white rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                    </svg>
                </button>
            </div>
            {inputOpen && searchResults?.length > 0 && (
                <ul className="z-10 absolute bg-white rounded-2xl mt-1 px-4 py-2 border border-gray-300">
                    <div className="text-xl mb-2">Address</div>
                    {searchResults.map((result) => (
                        <li key={result._id} className="py-2 border-t cursor-pointer hover:bg-gray-100">
                            <Link to={`/place/${result._id}`}>{result.address}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Search;
