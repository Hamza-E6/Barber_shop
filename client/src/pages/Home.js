import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Scissors, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="relative h-screen">
          <img
            src="/barber-shop.jpg"
            alt="Barber cutting hair"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center">Barber Shop</h1>
            <Link
              to="/schedule"
              className="bg-white text-gray-900 px-8 py-4 rounded-full text-xl font-semibold hover:bg-gray-200 transition duration-300 transform hover:scale-105"
            >
              Make an Appointment Now
            </Link>
          </div>
        </div>
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8 text-gray-800">About Our Shop</h2>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-lg mb-6 text-gray-600 leading-relaxed">
                  Welcome to Barber, where tradition meets modern style. Our skilled barbers have been
                  providing top-notch haircuts and grooming services since 1950. We take pride in our
                  craft and ensure that every client leaves our shop looking and feeling their best.
                </p>
                <div className="flex justify-center">
                  <Scissors className="w-12 h-12 text-gray-800" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8 text-gray-800">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Classic Haircuts",
                  "Beard Trims",
                  "Hot Towel Shaves",
                  "Hair Styling",
                  "Kids Haircuts",
                  "Facial Treatments"
                ].map((service, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md transition duration-300 hover:shadow-xl">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{service}</h3>
                    <div className="w-16 h-1 bg-gray-800 mx-auto mb-4"></div>
                    <p className="text-gray-600">Experience our professional {service.toLowerCase()} service.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8 text-gray-800">Location</h2>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="aspect-w-16 aspect-h-9 mb-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095919655!2d-74.00425878459399!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80da61087cc12a!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1621436761410!5m2!1sen!2sus"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    title="Google Maps"
                  ></iframe>
                </div>
                <div className="flex items-center justify-center text-gray-600">
                  <MapPin className="w-6 h-6 mr-2" />
                  <p>123 Barber Street, New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Barber Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

