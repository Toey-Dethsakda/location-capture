// src/components/LocationCapture.js
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

function LocationCapture() {
  const [location, setLocation] = useState(null);

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // axios.get('https://location-service-olive.vercel.app/') // Replace with your API endpoint
        //   .then((response) => {
        //     // Handle the response data here
        //     setLocation(response.data);
        //   })
        //   .catch((error) => {
        //     console.error('Error:', error);
        //   });

        setLocation({ latitude, longitude });
      }, function (error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("User denied the request for geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
          case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <button onClick={handleGetLocation}>เข้าสู่หน้าแรก</button>
      {location && (
        <div>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </div>
      )}
    </div>
  );
}

export default LocationCapture;
