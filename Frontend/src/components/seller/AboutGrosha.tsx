import React from 'react';

const AboutGrosha = () => {
  const features = [
    {
      title: 'Fast & Reliable Delivery',
      description:
        'We ensure fresh and quality groceries are delivered quickly from your nearest local store.',
    },
    {
      title: 'Empowering Local Sellers',
      description:
        'Grosha  helps small and mid-sized stores grow their reach and manage online orders with ease.',
    },
    {
      title: 'Simple & User-Friendly',
      description:
        'From placing orders to tracking deliveries, Grosha offers a smooth and simple experience for everyone.',
    },
  ];
  return (
    <section id='about' className="bg-white py-16 px-6 md:px-16">

      <h2 className="text-3xl md:text-4xl font-bold text-green-500 mb-5 text-center">About Grosha</h2>
      <div className='flex justify-center items-center mb-4 flex-col w-[100%] md:w-[70%] m-auto'>
        <p className="text-gray-600 text-lg text-center ">
          Grosha is your one-stop online grocery delivery platform that connects local stores with customers across Nepal. Whether you're a busy professional, a home-maker, or a shop owner—Groshaaa brings daily essentials to your doorstep efficiently and affordably.
        </p>

        <div className="mt-10 grid  grid-rows-1 md:grid-cols-2  lg:grid-cols-3 gap-8 text-left">
          {features.map((feature, index) => (
            <div key={index} className="bg-green-200 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default AboutGrosha;
