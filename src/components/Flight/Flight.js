import React from 'react';
import './Flight.css'; 

const Flight = ({ flight }) => {
    const { id, type, origin, destination, status, arrivalTime, departureTime } = flight;

    return (
        <div className={`flight flight-${type} flight-status-${status.toLowerCase().replace(/ /g, '-')}`}>
            <span className="flight-id">{id}</span>
            {type === 'arrival' && <span className="flight-origin">From: {origin}</span>}
            {type === 'departure' && <span className="flight-destination">To: {destination}</span>}
            <span className="flight-status">Status: {status}</span>
            {/* Display Time based on Type */}
            {type === 'arrival' && arrivalTime && (
                <span className="flight-time">ETA: {arrivalTime}</span>
            )}
            {type === 'departure' && departureTime && (
                <span className="flight-time">ETD: {departureTime}</span>
            )}
        </div>
    );
};

export default Flight;