import React, { useState } from 'react';
import './BookingForm.css';

const MAX_CARGO_WEIGHT_PER_PERSON = 25; // Example limit in KG

const BookingForm = ({ availableFlights, onBookingSubmit }) => {
    const [passengerName, setPassengerName] = useState('');
    const [selectedFlightId, setSelectedFlightId] = useState('');
    const [cargoWeight, setCargoWeight] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setError('');
        setSuccessMessage('');

        const weight = parseFloat(cargoWeight);

        // Validation
        if (!passengerName || !selectedFlightId || !cargoWeight) {
            setError('Please fill in all fields.');
            return;
        }
        if (isNaN(weight) || weight < 0) {
             setError('Please enter a valid cargo weight.');
             return;
        }
        if (weight > MAX_CARGO_WEIGHT_PER_PERSON) {
            setError(`Cargo weight exceeds the limit of ${MAX_CARGO_WEIGHT_PER_PERSON}kg per passenger.`);
            return;
        }

        // Simulate booking submission
        const bookingDetails = {
            passengerName,
            flightId: selectedFlightId,
            cargoWeight: weight,
            bookingTime: new Date().toISOString()
        };

        console.log("Simulating Booking:", bookingDetails);
        onBookingSubmit(bookingDetails); // Pass data up to App.js

        setSuccessMessage(`Booking successful for ${passengerName} on flight ${selectedFlightId}!`);

        // Clear form
        setPassengerName('');
        setSelectedFlightId('');
        setCargoWeight('');
    };

    return (
        <div className="booking-form">
            <h2>Book a Flight</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="passengerName">Passenger Name:</label>
                    <input
                        type="text"
                        id="passengerName"
                        value={passengerName}
                        onChange={(e) => setPassengerName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="flightId">Select Flight:</label>
                    <select
                        id="flightId"
                        value={selectedFlightId}
                        onChange={(e) => setSelectedFlightId(e.target.value)}
                        required
                    >
                        <option value="" disabled>-- Select a Flight --</option>
                        {availableFlights.map(flight => (
                            <option key={flight.id} value={flight.id}>
                                {flight.id} ({flight.type === 'arrival' ? flight.origin : flight.destination})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="cargoWeight">Cargo Weight (kg):</label>
                    <input
                        type="number"
                        id="cargoWeight"
                        value={cargoWeight}
                        onChange={(e) => setCargoWeight(e.target.value)}
                        step="0.1"
                        min="0"
                        required
                    />
                     <small>Max: {MAX_CARGO_WEIGHT_PER_PERSON}kg per person</small>
                </div>
                <button type="submit">Book Now</button>
            </form>
        </div>
    );
};

export default BookingForm;