import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from "date-fns";

export default function SendEmail() {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state || !state.reservationData) {
            navigate('/', { state: { message: 'Please reserve first before confirming.' } });
        }
    }, [state, navigate]);

    if (!state || !state.reservationData) {
        return null; // This will render nothing as the redirection happens
    }

    const { RoomType, date, searchPref, totalCost, reservationData, reservationId } = state;

    return (
        <div className="p-4 flex-col">
            <div className="container mx-auto p-8">
                <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">Reservation Confirmation</h1>
                        <p>Thank you so much for booking your stay with us! We hope you have a miraculous and enchanting stay, pack warm.</p>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold">Reservation Details</h2>
                            <p>Reservation ID: {reservationId}</p>
                            <p>Name: {reservationData.name}</p>
                            <p>Phone: {reservationData.phone}</p>
                            <p>Room Type: {RoomType}</p>
                            <p>Adults: {searchPref.adult}</p>
                            <p>Children: {searchPref.children}</p>
                            <p>Total Rooms: {searchPref.room}</p>
                            <p>Dates: {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</p>
                            <p>Total Cost: ${totalCost.toFixed(2)}</p>
                        </div>
                        <p className='font-bold'>Please keep your reservation ID secure! It's your only way to access your reservation besides contacting us</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
