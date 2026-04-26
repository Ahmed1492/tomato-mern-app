const Header = () => {
  return (
    <div className="bg-header w-full h-[75vh] md:h-[90vh] relative group overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-16 right-16 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-24 left-12 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/15 rounded-full blur-xl float-animation"></div>
      
      {/* Main Content Container */}
      <div className="flex items-center justify-between h-full px-4 md:px-12 relative z-10">
        {/* Left Content */}
        <div className="flex-1 max-w-3xl">
          <div className="slideInLeft">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                🍕 Fresh & Delicious
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
              <span className="block text-white">Order Your</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                Favorite Food
              </span>
              <span className="block text-white/90 text-3xl md:text-5xl lg:text-6xl font-light">
                delivered fast
              </span>
            </h1>
          </div>
          
          <div className="slideInLeft" style={{ animationDelay: '0.2s' }}>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl">
              Discover a world of flavors with our carefully curated menu. From comfort classics to exotic cuisines, 
              we bring restaurant-quality meals straight to your doorstep.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 slideInLeft" style={{ animationDelay: '0.4s' }}>
            <a href="#explore-menu">
              <button className="group bg-white text-gray-800 font-bold rounded-full text-lg px-8 py-4 hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 hover:scale-105 shadow-xl">
                <span className="flex items-center gap-3">
                  Order Now
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </a>
            
            <button className="group bg-transparent border-2 border-white/50 text-white font-semibold rounded-full text-lg px-8 py-4 hover:bg-white/10 hover:border-white transition-all duration-300">
              <span className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Video
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 slideInLeft" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-300 mb-1">500+</div>
              <div className="text-sm md:text-base text-white/80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-300 mb-1">50+</div>
              <div className="text-sm md:text-base text-white/80">Menu Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-300 mb-1">4.8★</div>
              <div className="text-sm md:text-base text-white/80">Rating</div>
            </div>
          </div>
        </div>

        {/* Right Content - Food Image */}
        <div className="hidden lg:flex flex-1 justify-center items-center slideInRight">
          <div className="relative">
            {/* Main Food Image */}
            <div className="w-80 h-80 xl:w-96 xl:h-96 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-red-400/20 rounded-full blur-3xl"></div>
              <img 
                src="/food_1.png" 
                alt="Delicious Food" 
                className="w-full h-full object-contain relative z-10 float-animation"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
              🍔
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-xl animate-bounce" style={{ animationDelay: '0.5s' }}>
              🍕
            </div>
            <div className="absolute top-1/2 -left-8 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-lg animate-bounce" style={{ animationDelay: '1s' }}>
              🥗
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
      
      {/* Decorative Shapes */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-40 right-32 w-3 h-3 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-10 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
    </div>
  );
};

export default Header;
