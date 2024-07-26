import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faConciergeBell, faSwimmer, faUtensils, 
  faMapMarkerAlt, faInfoCircle, faCrown } from '@fortawesome/free-solid-svg-icons';
import BreakfastImg from "../images/breakfast.png";
import KitchenImg from "../images/dining.png";
import PoolImg from "../images/pool.png";
import TrolltungaImg from "../images/Trolltunga.jpeg";
import FolgefonnaImg from "../images/Folgefonna.jpg";
import VoringfossenImg from "../images/Voringfossen.webp";
import IceImg from "../images/IceClimbing.jfif";
import EtiquetteImg from "../images/Etiquette.jfif";
import TrainImg from "../images/Train.jpg";


export default function Services() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8 font-mono">
      <header className="bg-blue-900 text-white p-4 text-center rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-4xl font-bold">Blissful Hotel</h1>
        <p className="text-xl mt-2">Hardangerfjord, Norway</p>
      </header>
      <main className="mt-8 bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Payment Policies</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 mr-2" />
              Refunds are only available to be processed in person, at the reception desk.
            </li>
            <li>
              <FontAwesomeIcon icon={faClock} className="text-blue-500 mr-2" />
              All guests must check out at 11 am at the latest and check in time is 3 pm.
            </li>
            <li>
              <FontAwesomeIcon icon={faConciergeBell} className="text-blue-500 mr-2" />
              All guests are given check-in cards at check-in and must return them at checkout.
            </li>
          </ul>
        </section>
        <section className="mb-8 justify-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Amenities</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              <FontAwesomeIcon icon={faUtensils} className="text-blue-500 mr-2" />
              Free continental breakfast
            </li>
            <li>
              <FontAwesomeIcon icon={faSwimmer} className="text-blue-500 mr-2" />
              Infinity pool and spa
            </li>
            <li>
              <FontAwesomeIcon icon={faUtensils} className="text-blue-500 mr-2" />
              5-star restaurant recommendations
            </li>
          </ul>
          <div className="flex flex-col items-center gap-7 mt-4">
            <div className="bg-gray-300 rounded h-48 w-96 overflow-hidden">
              <img src={BreakfastImg} alt="Free continental breakfast" className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"/>
            </div>
            <div className="bg-gray-300 rounded h-48 w-96 overflow-hidden">
              <img src={KitchenImg} alt="5-star restaurant recommendations" className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"/>
            </div>
            <div className="bg-gray-300 rounded h-48 w-96 overflow-hidden">
              <img src={PoolImg} alt="Infinity pool and spa" className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"/>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Local Regulations</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 mr-2" />
              Quiet hours are from 11 PM to 7 AM. Please respect the peace and tranquility of the surroundings.
            </li>
            <li>
              <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 mr-2" />
              Smoking is prohibited in all indoor areas. Designated smoking areas are provided outside.
            </li>
            <li>
              <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 mr-2" />
              Local wildlife protection laws must be followed. Feeding wild animals is strictly prohibited.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Sights to See</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2" />
              Trolltunga - A famous rock formation with breathtaking views.
            </li>
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2" />
              Folgefonna National Park - Home to one of Norway's largest glaciers.
            </li>
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2" />
              Vøringsfossen - One of Norway's most famous waterfalls.
            </li>
            <li>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2" />
              Hardangervidda National Park - Ideal for hiking and experiencing the Norwegian wilderness.
            </li>
          </ul>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-300 h-64 w-full rounded flex items-center justify-center overflow-hidden">
              <img src={TrolltungaImg} alt="Sights to see 1" className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"/>
            </div>
            <div className="bg-gray-300 h-64 w-full rounded flex items-center justify-center overflow-hidden">
              <img src={FolgefonnaImg} alt="Sights to see 2" className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"/>
            </div>
            <div className="bg-gray-300 h-64 w-full rounded flex items-center justify-center overflow-hidden">
              <img src={VoringfossenImg} alt="Sights to see 3" className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"/>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Cultural Practices</h2>
          <ul className="list-disc pl-6 text-gray-600">
            <li>
              <FontAwesomeIcon icon={faCrown} className="text-blue-500 mr-2" />
              Norwegians value punctuality. Be on time for any scheduled activities or reservations.
            </li>
            <li>
              <FontAwesomeIcon icon={faCrown} className="text-blue-500 mr-2" />
              Greeting with a firm handshake is common practice.
            </li>
            <li>
              <FontAwesomeIcon icon={faCrown} className="text-blue-500 mr-2" />
              It is customary to remove your shoes when entering someone's home.
            </li>
            <li>
              <FontAwesomeIcon icon={faCrown} className="text-blue-500 mr-2" />
              Norwegians appreciate their personal space and privacy. Respecting this is important.
            </li>
          </ul>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-300 h-64 w-full rounded flex items-center justify-center overflow-hidden">
              <img src={EtiquetteImg} alt="Cultural practice 1" className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"/>
            </div>
            <div className="bg-gray-300 h-64 w-full rounded flex items-center justify-center overflow-hidden">
              <img src={TrainImg} alt="Cultural practice 2" className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"/>
            </div>
            <div className="bg-gray-300 h-64 w-full rounded flex items-center justify-center overflow-hidden">
              <img src={IceImg} alt="Cultural practice 3" className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"/>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
