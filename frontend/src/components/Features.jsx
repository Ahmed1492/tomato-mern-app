const Features = () => {
  const features = [
    {
      icon: (<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>),
      title: "Lightning Fast Delivery",
      description: "Get your favorite food delivered in 30 minutes or less with our express delivery service.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: (<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>),
      title: "Fresh Ingredients",
      description: "We source only the freshest, highest quality ingredients from local farms and trusted suppliers.",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: (<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/></svg>),
      title: "Best Prices",
      description: "Enjoy delicious meals at unbeatable prices with our daily deals and special offers.",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: (<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>),
      title: "Made with Love",
      description: "Every dish is prepared with passion and care by our expert chefs who love what they do.",
      color: "from-pink-400 to-red-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#ff6b6b]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#ee5a6f]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="container mx-auto px-8 relative z-10">
        <div className="text-center mb-16 fadeInUp">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Why Choose <span className="gradient-text">Tomato?</span></h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're not just another food delivery service. We're your culinary companion, committed to bringing you exceptional dining experiences right to your doorstep.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-[#ff6b6b] transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b6b]/5 to-[#ee5a6f]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16 fadeInUp" style={{ animationDelay: '0.6s' }}>
          <button className="btn-primary text-white font-bold px-12 py-4 rounded-full text-lg shadow-2xl">Start Ordering Now</button>
        </div>
      </div>
    </section>
  );
};

export default Features;
