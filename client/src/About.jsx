import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faCartFlatbedSuitcase, faUtensils, faPersonSkiingNordic, faRecycle, faBellConcierge } from '@fortawesome/free-solid-svg-icons';
import { MDBContainer } from 'mdb-react-ui-kit';

export default function Services() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    setIframeLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        {iframeLoaded && (
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/J8AWyawBVx0?autoplay=1&mute=1&loop=1&playlist=J8AWyawBVx0&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&disablekb=1"
            allow="autoplay; loop; fullscreen"
            allowFullScreen
            title="Background Video"
          ></iframe>
        )}
      </div>
      <MDBContainer fluid className="relative z-10 d-flex align-items-center justify-content-center p-0 h-screen">
        <div className="bg-blue-900 bg-opacity-75 text-white p-4 text-center rounded-lg shadow-md w-full max-w-4xl">
          <h1 className="text-4xl font-bold">About Us - Blissful Hotel</h1>
          <h2 className="text-xl mt-2 italic">Welcome to Hotel Blissful – Your Sanctuary in the Heart of Hardangerfjord, Norway</h2>
        </div>
        <main className="relative z-10 mt-8 bg-white bg-opacity-75 p-6 rounded-lg shadow-md w-full max-w-4xl">
          <section className="mb-8">
            <ul className="list-disc pl-6 text-gray-600">
              <li>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Story</h2>
                <FontAwesomeIcon icon={faHotel} className="text-blue-500 mr-2" />
                At Hotel Blissful, we believe that the essence of a memorable stay lies in the seamless blend of natural beauty and refined comfort. Founded with a vision to create a haven for those seeking both adventure and relaxation, our hotel is designed to immerse you in the stunning landscapes of Norway while offering top-tier amenities and services.
              </li>
              <li>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Accommodations</h2>
                <FontAwesomeIcon icon={faCartFlatbedSuitcase} className="text-blue-500 mr-2" />
                Each of our rooms and suites is thoughtfully designed to offer panoramic views of the fjord and surrounding mountains. With decor inspired by the serene natural environment, our accommodations provide a perfect balance of rustic charm and modern luxury. Enjoy the soothing sounds of nature from your private balcony or cozy up by the fireplace with a good book.
              </li>
              <li>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Dining Experience</h2>
                <FontAwesomeIcon icon={faUtensils} className="text-blue-500 mr-2" />
                Our on-site restaurant features a farm-to-table dining experience, showcasing the freshest local ingredients. From traditional Norwegian dishes to contemporary cuisine, our chefs craft each meal with passion and creativity. Whether you're enjoying breakfast as the sun rises over the fjord or a candlelit dinner under the stars, every meal at Hotel Blissful is a feast for the senses.
              </li>
              <li>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Activities and Adventures</h2>
                <FontAwesomeIcon icon={faPersonSkiingNordic} className="text-blue-500 mr-2" />
                Hotel Blissful is the perfect base for exploring the wonders of Hardangerfjord. Whether you're interested in hiking through lush forests, kayaking on pristine waters, or simply soaking in the natural hot springs, our concierge team is here to help you plan your perfect adventure. For those seeking relaxation, our wellness spa offers a range of treatments designed to rejuvenate your body and mind.
              </li>
              <li>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Sustainability Commitment</h2>
                <FontAwesomeIcon icon={faRecycle} className="text-blue-500 mr-2" />
                We are committed to preserving the natural beauty that surrounds us. Our hotel practices sustainable tourism, minimizing our environmental impact through energy-efficient technologies, waste reduction initiatives, and support for local conservation efforts. We strive to offer our guests a luxurious stay that is also mindful of the planet.
              </li>
              <li>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Join Us</h2>
                <FontAwesomeIcon icon={faBellConcierge} className="text-blue-500 mr-2" />
                At Hotel Blissful, we invite you to escape the ordinary and discover the extraordinary. Experience the unparalleled beauty of Hardangerfjord, where every moment is a celebration of nature and luxury. Whether you’re here for a romantic getaway, a family vacation, or a solo adventure, we promise a stay that will leave you feeling refreshed, inspired, and connected to the beauty of the world around you.
              </li>
              <h1 className="text-4xl font-bold">Life is beautiful with nature. Welcome to Hotel Blissful.</h1>
            </ul>
          </section>
        </main>
      </MDBContainer>
    </div>
  );
}
