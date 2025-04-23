// src/components/Runway/Runway.js - (Should be like this from previous step)
import React from 'react';
import Flight from '../Flight/Flight'; // Ensure path is correct
import './Runway.css';

const Runway = ({ title, flights, className = '' }) => {
    const runwayClasses = `runway ${className}`.trim();

    return (
        <div className={runwayClasses}>
             {/* Make sure title has a class if you targeted it in App.css */}
            <h2 className="runway-title">{title}</h2>
            <div className="runway-strip">
                {flights.length > 0 ? (
                    flights.map(flight => (
                        // Passing the whole flight object here is correct
                        <Flight key={flight.id} flight={flight} />
                    ))
                ) : (
                    <p className="runway-empty">Runway Clear</p>
                )}
            </div>
        </div>
    );
};

export default Runway;