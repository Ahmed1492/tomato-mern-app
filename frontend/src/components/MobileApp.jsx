import { useState, useEffect } from "react";
import play_store from "../assets/play_store.png";
import app_store from "../assets/app_store.png";

const MobileApp = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: "🚀",
      title: "Fast Delivery",
      description: "Get your food delivered in 30 minutes or less"
    },
    {
      icon: "💳",
      title: "Easy Payment",
      description: "Multiple payment options for your convenience"
    },
    {
      icon: "🔔",
      title: "Live Tracking",
      description: "Track your order in real-time from kitchen to doorstep"
    },
    {
      icon: "🎁",
      title: "Exclusive Offers",
      description: "Get app-only deals and discounts"
    }
  ];

  const stats = [
    { number: "1M+", label: "Downloads" },
    { number: "4.8", label: "Rating" },
    { number: "50K+", label: "Reviews" },
    { number: "24/7", label: "Support" }
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="app-download" className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 rounded-3xl">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#ff6b6b]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#ee5a6f]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-2000"></div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left fadeInLeft">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white text-sm font-semibold rounded-full mb-6">
                📱 Download Our App
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                Get the <span className="gradient-text">Food Flow</span><br />
                Mobile Experience
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl">
                Order faster, track easier, and enjoy exclusive app-only features. 
                Download now and get your first order with 20% off!
              </p>
            </div>

            {/* Features Carousel */}
            <div className="bg-white rounded-3xl p-8 shadow-lg mb-8 border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{features[currentFeature].icon}</div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {features[currentFeature].title}
                  </h3>
                  <p className="text-gray-600">{features[currentFeature].description}</p>
                </div>
              </div>
              
              {/* Feature Dots */}
              <div className="flex justify-center gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentFeature 
                        ? 'bg-[#ff6b6b] scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button className="group relative overflow-hidden bg-black text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center gap-3 relative z-10">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4482-.9993-.9993s.4482-.9993.9993-.9993.9993.4482.9993.9993-.4482.9993-.9993.9993zm-11.046 0c-.5511 0-.9993-.4482-.9993-.9993s.4482-.9993.9993-.9993.9993.4482.9993.9993-.4482.9993-.9993.9993z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-80">Get it on</div>
                    <div className="text-lg font-bold">Google Play</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group relative overflow-hidden bg-black text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center gap-3 relative z-10">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-80">Download on the</div>
                    <div className="text-lg font-bold">App Store</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/70 transition-all duration-300"
                >
                  <div className="text-2xl font-bold gradient-text mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end fadeInRight">
            <div className="relative phone-float">
              {/* Phone Frame */}
              <div className="relative w-80 h-[600px] bg-gradient-to-br from-gray-900 to-black rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Phone Screen Content */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] p-8 flex flex-col">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center text-white text-sm mb-8">
                      <span className="font-semibold">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                        <div className="w-4 h-2 bg-white rounded-sm"></div>
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">Food Flow</h3>
                      <p className="text-white/80">Order • Track • Enjoy</p>
                    </div>

                    {/* Feature Cards */}
                    <div className="space-y-4 flex-1">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">🍕</span>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">Quick Order</h4>
                            <p className="text-white/70 text-sm">Reorder favorites instantly</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">📍</span>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">Live Tracking</h4>
                            <p className="text-white/70 text-sm">Real-time delivery updates</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">💰</span>
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">Exclusive Deals</h4>
                            <p className="text-white/70 text-sm">App-only discounts</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="bg-white rounded-2xl p-4 text-center">
                      <p className="text-gray-800 font-semibold">Get 20% off your first order!</p>
                      <p className="text-gray-600 text-sm">Use code: WELCOME20</p>
                    </div>
                  </div>
                </div>

                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
                🍔
              </div>
              <div className="absolute -bottom-8 -right-8 w-14 h-14 bg-green-400 rounded-full flex items-center justify-center text-xl animate-bounce delay-500">
                🥗
              </div>
              <div className="absolute top-1/2 -right-12 w-12 h-12 bg-red-400 rounded-full flex items-center justify-center text-lg animate-bounce delay-1000">
                🍕
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - QR Code */}
        <div className="text-center mt-20 fadeInUp">
          <div className="bg-white rounded-3xl p-8 shadow-lg inline-block border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Scan to Download</h3>
            <div className="w-32 h-32 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] rounded-xl flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
            <p className="text-gray-600">Point your camera here to download</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
