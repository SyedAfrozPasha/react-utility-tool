import React from 'react';

export default function HeroSection({ title, description }) {
  return (
    <section className="bg-teal-100 p-8 text-center">
      <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
        String Utility Tool
      </h1>

      <p className="text-gray-700 text-lg mb-4">
        A simple tool to convert a value into desired value by passing
        appropriate value in the below converter settings.
      </p>
      <p className="text-gray-700 text-lg mb-8">
        Enter your data on the left and add your desired config, hit the{' '}
        <i>Run</i> button, and boom!, desired data on the right.
      </p>

      <div className="space-x-2">
        <a
          href="#"
          className="py-3 px-8 bg-gray-400 hover:bg-gray-300 text-gray-800 hover:text-gray-900 rounded-lg hover:shadow-xl transition duration-300"
        >
          Try an example
        </a>
        <a
          href="#"
          className="py-3 px-8 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 rounded-lg hover:shadow-xl transition duration-300"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
