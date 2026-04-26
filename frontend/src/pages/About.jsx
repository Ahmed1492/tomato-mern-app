import { useState } from "react";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("story");

  const stats = [
    { number: "10K+", label: "Happy Customers", icon: "👥" },
    { number: "500+", label: "Menu Items", icon: "🍽️" },
    { number: "50+", label: "Restaurant Partners", icon: "🏪" },
    { number: "4.8", label: "Average Rating", icon: "⭐" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Passionate about connecting people with great food experiences."
    },
    {
      name: "Michael Chen",
      role: "Head Chef",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "15+ years of culinary expertise bringing flavors to life."
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Ensuring every order is delivered with excellence and care."
    },
    {
      name: "David Kim",
      role: "Tech Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Building the technology that powers seamless food delivery."
    }
  ];

  const values = [
    {
      icon: "🌟",
      title: "Quality First",
      description: "We partner only with restaurants that meet our high standards for food quality and safety."
    },
    {
      icon: "⚡",
      title: "Fast Delivery",
      description: "Our optimized delivery network ensures your food arrives hot and fresh, every time."
    },
    {
      icon: "💚",
      title: "Sustainability",
      description: "We're committed to eco-friendly packaging and supporting local, sustainable food sources."
    },
    {
      icon: "🤝",
      title: "Community",
      description: "Supporting local restaurants and creating jobs in communities we serve."
    }
  ];

  const milestones = [
    { year: "2020", title: "Founded", description: "Food Flow was born with a vision to revolutionize food delivery" },
    { year: "2021", title: "First 1000 Orders", description: "Reached our first major milestone with amazing customer feedback" },
    { year: "2022", title: "50 Restaurant Partners", description: "Expanded our network to include diverse culinary options" },
    { year: "2023", title: "10K+ Customers", description: "Built a loyal community of food lovers across the city" },
    { year: "2024", title: "Mobile App Launch", description: "Launched our mobile app with enhanced features and user experience" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#ff6b6b] via-[#ee5a6f] to-[#ff6b6b] py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="text-center text-white fadeInUp">
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              About <span className="text-yellow-300">Food Flow</span>
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto opacity-90">
              We're passionate about connecting people with exceptional food experiences, 
              one delivery at a time. Discover our story, values, and the team behind your favorite meals.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12 fadeInUp">
            <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              {[
                { id: "story", label: "Our Story", icon: "📖" },
                { id: "values", label: "Our Values", icon: "💎" },
                { id: "team", label: "Our Team", icon: "👨‍👩‍👧‍👦" },
                { id: "timeline", label: "Timeline", icon: "🚀" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] text-white shadow-lg"
                      : "text-gray-600 hover:text-[#ff6b6b] hover:bg-gray-50"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="fadeIn">
            {/* Our Story */}
            {activeTab === "story" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="fadeInLeft">
                  <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Journey Began</h2>
                  <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                    <p>
                      Food Flow started in 2020 with a simple mission: to make great food accessible to everyone, 
                      anywhere, anytime. What began as a small team of food enthusiasts has grown into a 
                      thriving platform that connects thousands of customers with their favorite restaurants.
                    </p>
                    <p>
                      We believe that food is more than just sustenance—it's about bringing people together, 
                      creating memories, and celebrating life's moments. That's why we've built a platform 
                      that doesn't just deliver food, but delivers experiences.
                    </p>
                    <p>
                      Today, we're proud to serve over 10,000 happy customers and partner with 50+ local 
                      restaurants, all while maintaining our commitment to quality, speed, and exceptional service.
                    </p>
                  </div>
                </div>
                <div className="fadeInRight">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
                      alt="Food preparation"
                      className="w-full h-96 object-cover rounded-3xl shadow-2xl"
                    />
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] rounded-3xl flex items-center justify-center text-white text-4xl shadow-xl">
                      🍽️
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Our Values */}
            {activeTab === "values" && (
              <div>
                <div className="text-center mb-12 fadeInUp">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">What Drives Us</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Our values guide every decision we make and every service we provide
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {values.map((value, index) => (
                    <div 
                      key={index}
                      className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="text-5xl mb-6">{value.icon}</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Our Team */}
            {activeTab === "team" && (
              <div>
                <div className="text-center mb-12 fadeInUp">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    The passionate people behind Food Flow who make it all possible
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {team.map((member, index) => (
                    <div 
                      key={index}
                      className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center fadeInUp"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <img 
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-gray-100"
                      />
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                      <p className="text-[#ff6b6b] font-semibold mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            {activeTab === "timeline" && (
              <div>
                <div className="text-center mb-12 fadeInUp">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Key milestones that shaped Food Flow into what it is today
                  </p>
                </div>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#ff6b6b] to-[#ee5a6f] rounded-full"></div>
                  
                  <div className="space-y-12">
                    {milestones.map((milestone, index) => (
                      <div 
                        key={index}
                        className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} fadeInUp`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="text-2xl font-bold gradient-text mb-2">{milestone.year}</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{milestone.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                          </div>
                        </div>
                        
                        {/* Timeline Dot */}
                        <div className="w-6 h-6 bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] rounded-full border-4 border-white shadow-lg z-10"></div>
                        
                        <div className="flex-1"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-[#ff6b6b] via-[#ee5a6f] to-[#ff6b6b] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience Food Flow?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of satisfied customers and discover why Food Flow is the preferred choice for food delivery
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-white text-[#ff6b6b] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Order Now
            </button>
            <button 
              onClick={() => window.location.href = '/#app-download'}
              className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-[#ff6b6b] transition-all duration-300 hover:scale-105"
            >
              Download App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
