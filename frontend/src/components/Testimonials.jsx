"use client";
import { useState, useEffect } from "react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { name: "Sarah Johnson", role: "Food Blogger", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face", content: "The quality of food and speed of delivery is absolutely amazing! I've been ordering from Tomato for months and they never disappoint.", rating: 5 },
    { name: "Mike Chen", role: "Software Engineer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", content: "As someone who works long hours, Tomato has been a lifesaver. Fresh, delicious meals delivered right to my office!", rating: 5 },
    { name: "Emily Rodriguez", role: "Marketing Manager", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", content: "The variety of cuisines available is incredible. From Italian to Asian, everything is prepared to perfection.", rating: 5 },
    { name: "David Kim", role: "Student", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", content: "Great prices for students and the food quality is restaurant-level. Highly recommend to everyone!", rating: 5 }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-[#ff6b6b] via-[#ee5a6f] to-[#ff6b6b] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>
      <div className="container mx-auto px-8 relative z-10">
        <div className="text-center mb-16 fadeInUp">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">What Our Customers Say</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">Don't just take our word for it. Here's what our happy customers have to say.</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl fadeIn">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-lg ring-4 ring-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">"{testimonials[currentTestimonial].content}"</blockquote>
                <div>
                  <div className="font-bold text-xl text-gray-800">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button key={index} onClick={() => setCurrentTestimonial(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 fadeInUp">
          {[["1000+","Happy Customers"],["50+","Menu Items"],["4.9★","Average Rating"],["24/7","Service"]].map(([v,l]) => (
            <div key={l} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{v}</div>
              <div className="text-white/80">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
