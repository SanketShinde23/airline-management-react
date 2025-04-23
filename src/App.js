import React, { useState, useEffect } from 'react';
import Runway from './components/Runway/Runway';
import BookingForm from './components/BookingForm/BookingForm';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import { fetchWeatherData } from './services/weatherAPI';
import './App.css';

// --- Mock Data (Added Time Information) ---
const initialFlights = [
  // Runway 1: Arrivals
  { id: 'BA123', type: 'arrival', origin: 'NYk', status: 'Landing', runway: 1, arrivalTime: '14:30' },
  { id: 'LH789', type: 'arrival', origin: 'Frankfurt', status: 'Arrived', runway: 1, arrivalTime: '14:15' }, // Start as Arrived to test initial filter
  { id: 'BA120', type: 'arrival', origin: 'NYk', status: 'Landing', runway: 1, arrivalTime: '14:55' },
  { id: 'EK201', type: 'arrival', origin: 'Dubai', status: 'Landing', runway: 1, arrivalTime: '15:10' },

  // Runway 2: Departures
  { id: 'AF456', type: 'departure', destination: 'Paris', status: 'Boarding', runway: 2, departureTime: '14:45' },
  { id: 'AF459', type: 'departure', destination: 'Nashik', status: 'Boarding', runway: 2, departureTime: '15:00' },
  { id: 'UA987', type: 'departure', destination: 'CIG', status: 'Departing', runway: 2, departureTime: '14:20' },
  { id: 'SQ305', type: 'departure', destination: 'SGP', status: 'Departed', runway: 2, departureTime: '14:05' }, // Start as Departed to test initial filter
  { id: 'AF444', type: 'departure', destination: 'Paris', status: 'Boarding', runway: 2, departureTime: '15:25' },
  { id: 'AF490', type: 'departure', destination: 'Dubai', status: 'Boarding', runway: 2, departureTime: '15:40' },

  // Runway 3: Emergency
  { id: 'SOS001', type: 'arrival', origin: 'Mid-Atlantic', status: 'Emergency Landing', runway: 3, arrivalTime: '14:35' },
  { id: 'MAYDAY01', type: 'arrival', origin: 'Unknown', status: 'Diverted - Emergency', runway: 3, arrivalTime: '14:50' },
];
// --- End Mock Data ---

function App() {
  const [flights, setFlights] = useState(initialFlights);
  const [bookings, setBookings] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState(false);

  // Fetch Weather Data
  useEffect(() => {
    const loadWeather = async () => {
      setWeatherLoading(true);
      setWeatherError(false);
      const data = await fetchWeatherData();
      if (data) {
        setWeatherData(data);
      } else {
        setWeatherError(true);
      }
      setWeatherLoading(false);
    };
    // Clear initial finished flights right away for cleaner start
    setFlights(currentFlights => currentFlights.filter(
        (f) => !['Arrived', 'Departed', 'Landed Safely'].includes(f.status)
    ));
    loadWeather();
    const intervalId = setInterval(loadWeather, 300000); // 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  // Simulate flight status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setFlights((currentFlights) => {
        // --- Step 1: Filter out flights that *finished* in the previous cycle ---
        const activeFlights = currentFlights.filter(
          (f) => !['Arrived', 'Departed', 'Landed Safely'].includes(f.status)
        );

        // --- Step 2: Map the remaining active flights to their *next* status ---
        return activeFlights.map((f) => {
          if (f.status === 'Landing') {
            return { ...f, status: 'Arrived' }; // Will be shown as 'Arrived' for one cycle
          }
          if (f.status === 'Boarding') {
            return { ...f, status: 'Departing' };
          }
          if (f.status === 'Departing') {
            return { ...f, status: 'Departed' }; // Will be shown as 'Departed' for one cycle
          }
          if (f.status === 'Emergency Landing') {
            return { ...f, status: 'Landed Safely' }; // Will be shown as 'Landed Safely' for one cycle
          }
          // No status change needed for this flight in this cycle
          return f;
        });
      });
    }, 20000); // 7 seconds for testing

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this runs once on mount

  // Filter flights for each runway (based on the current 'flights' state)
  const arrivalFlights = flights.filter((f) => f.runway === 1 && f.type === 'arrival');
  const departureFlights = flights.filter((f) => f.runway === 2 && f.type === 'departure');
  const emergencyFlights = flights.filter((f) => f.runway === 3);

  // Flights available for booking
  const bookableFlights = flights.filter((f) => f.type === 'departure' && f.status === 'Boarding');

  // Handle booking
  const handleBooking = (bookingDetails) => {
    console.log('Booking Received in App:', bookingDetails);
    setBookings((prevBookings) => [...prevBookings, bookingDetails]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Airline & Cargo Management</h1>
        <WeatherDisplay weatherData={weatherData} loading={weatherLoading} error={weatherError} />
      </header>

      <main className="App-main">
        <div className="runways-container">
          <Runway title="Runway 1: Arrivals" flights={arrivalFlights} />
          <Runway title="Runway 2: Departures" flights={departureFlights} />
          <Runway title="Runway 3: Emergency" flights={emergencyFlights} className="runway-emergency" />
        </div>

        <BookingForm availableFlights={bookableFlights} onBookingSubmit={handleBooking} />

        <div className="recent-bookings">
          <h3>Recent Bookings (Confirmed)</h3>
          {bookings.length > 0 ? (
            <ul>
              {bookings.slice(-10).reverse().map((b, index) => (
                <li key={index}>
                  {b.passengerName} booked on {b.flightId} ({b.cargoWeight}kg cargo)
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings yet</p>
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>Airline Management System</p>
      </footer>
    </div>
  );
}

export default App;