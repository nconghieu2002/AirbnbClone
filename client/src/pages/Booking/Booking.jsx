import { useParams } from "react-router-dom";

function Booking() {
    const {id} = useParams()

    return <div>booking: {id}</div>;
}

export default Booking;
