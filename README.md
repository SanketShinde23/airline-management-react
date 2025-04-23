# Airline & Cargo Management Dashboard (React)

A dynamic and responsive front-end application built with React to simulate an airport's flight management dashboard. This project showcases real-time data handling (simulated), component-based architecture, and state management within a modern React environment.

## Overview

This application provides a visual interface for monitoring flight activities across multiple virtual runways. It simulates arrivals, departures, and emergency landings, displaying pertinent flight details and status updates. The project integrates asynchronous data fetching for external information (like weather) and demonstrates effective use of React Hooks for managing component state and lifecycle events.

## Features

*   **Multi-Runway Display:** Dedicated views for Arrivals (Runway 1), Departures (Runway 2), and Emergency Landings (Runway 3).
*   **Real-time Flight Tracking (Simulated):** Displays flights with details such as Flight ID, Origin/Destination, Status, and ETA/ETD.
*   **Dynamic Status Updates:** Simulates flight progression (e.g., 'Boarding' -> 'Departing', 'Landing' -> 'Arrived', 'Emergency Landing' -> 'Landed Safely'). Completed flights are automatically cleared from view.
*   **Weather Integration:** Fetches and displays current weather data from an external API (OpenWeatherMap or similar) with loading and error states.
*   **Booking Form Interface:** A simple form allowing users to simulate booking passengers/cargo onto available departing flights.
*   **Recent Bookings Display:** Shows a list of recently confirmed bookings (in-memory).
*   **Responsive Design:** Adapts layout for various screen sizes using modern CSS techniques (Flexbox/Grid).
*   **Component-Based Architecture:** Modular design with reusable components (`Runway`, `Flight`, `BookingForm`, `WeatherDisplay`).

## Technology Stack

*   **React:** JavaScript library for building user interfaces (v18+ used).
*   **React Hooks:** (`useState`, `useEffect`) for state management and side effects.
*   **JavaScript (ES6+):** Core programming language.
*   **CSS3:** Styling the application, potentially including CSS Grid and Flexbox for layout.
*   **Axios/Fetch API:** For making asynchronous HTTP requests (e.g., to the weather API).
*   **Git & GitHub:** Version control and repository hosting.

## Setup and Installation

To run this project locally, follow these steps:

1.  **Prerequisites:**
    *   Node.js (v14 or later recommended) and npm/yarn installed.
    *   Git installed.

2.  **Clone the repository:**
    git clone https://github.com/SanketShinde23/airline-management-react.git
  

3.  **Navigate to the project directory:**
   
    cd airline-management-react
  

4.  **Install dependencies:**
   
    npm install
    # or if you prefer yarn:
    # yarn install
  

5.  **(Optional) Environment Variables:** If the project requires API keys (e.g., for the weather API), create a `.env.local` file in the root directory and add the necessary keys:
    env
    REACT_APP_WEATHER_API_KEY=your_api_key_here
 
    *(Note: Check src/services/weatherAPI.js or similar to confirm the required variable name)*

## Running the Project

Once the dependencies are installed, you can start the development server:

bash
npm start
# or
# yarn start
