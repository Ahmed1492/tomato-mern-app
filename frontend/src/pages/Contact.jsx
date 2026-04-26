import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you soon.");
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Our Location",
      lines: ["123 Food Street", "Flavor City, FC 10001"],
      color: "from-red-400 to-rose-500",
    },
    {
      icon: "📞",
      title: "Phone",
      lines: ["+1 (555) 123-4567", "Mon–Fri, 9am–6pm"],
      color: "from-orange-400 to-amber-500",
    },
    {
      icon: "✉️",
      title: "Email",
      lines: ["hello@foodflow.com", "support@foodflow.com"],
      color: "from-pink-400 to-rose-500",
    },
    {
      icon: "🕐",
      title: "Working Hours",
      lines: ["Mon–Fri: 9am – 10pm", "Sat–Sun: 10am – 11pm"],
      color: "from-purple-400 to-violet-500",
    },
  ];

  const faqs = [
    {
      q: "How long does delivery take?",
      a: "Most orders are delivered within 30–45 minutes depending on your location and restaurant.",
    },
    {
      q: "Can I track my order?",
      a: "Yes! Once your order is confirmed you can track it live from the My Orders page.",
    },
    {
      q: "How do I cancel an order?",
      a: "You can cancel within 5 minutes of placing the order. Contact support for help after that.",
    },
    {
      q: "Do you offer refunds?",
      a: "Yes, we offer full refunds for orders that don't meet our quality standards.",
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-24">

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#ff6b6b] via-[#ee5a6f] to-[#ff6b6b] py-20">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center text-white fadeInUp">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Get in <span className="text-yellow-300">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto opacity-90">
            Have a question, feedback, or just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <div
                key={i}
                className="group p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 fadeInUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${info.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {info.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">{info.title}</h3>
                {info.lines.map((line, j) => (
                  <p key={j} className="text-gray-500 text-sm">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form + Map */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Contact Form */}
            <div className="fadeInLeft">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
              <p className="text-gray-500 mb-8">Fill out the form and we'll respond within 24 hours.</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center fadeInUp">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-xl">
                    ✅
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">Thanks for reaching out. We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                    className="btn-primary text-white font-semibold px-8 py-3 rounded-full"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff6b6b] focus:ring-2 focus:ring-[#ff6b6b]/20 outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff6b6b] focus:ring-2 focus:ring-[#ff6b6b]/20 outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff6b6b] focus:ring-2 focus:ring-[#ff6b6b]/20 outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Issue</option>
                      <option value="delivery">Delivery Problem</option>
                      <option value="payment">Payment Query</option>
                      <option value="feedback">General Feedback</option>
                      <option value="partnership">Restaurant Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message <span className="text-red-500">*</span></label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff6b6b] focus:ring-2 focus:ring-[#ff6b6b]/20 outline-none transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Side: Map + Social */}
            <div className="fadeInRight space-y-8">
              {/* Fake Map */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl h-72 bg-gradient-to-br from-gray-200 to-gray-300">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <div className="text-6xl mb-3">🗺️</div>
                  <p className="font-semibold text-lg">123 Food Street</p>
                  <p className="text-sm">Flavor City, FC 10001</p>
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-xl px-3 py-2 shadow-lg text-xs font-semibold text-gray-700 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Open Now
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-bold text-gray-800 text-lg mb-4">Follow Us</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Facebook", icon: "📘", color: "bg-blue-50 hover:bg-blue-100 text-blue-600", handle: "@foodflow" },
                    { name: "Instagram", icon: "📸", color: "bg-pink-50 hover:bg-pink-100 text-pink-600", handle: "@foodflow" },
                    { name: "Twitter / X", icon: "🐦", color: "bg-sky-50 hover:bg-sky-100 text-sky-600", handle: "@foodflow" },
                    { name: "WhatsApp", icon: "💬", color: "bg-green-50 hover:bg-green-100 text-green-600", handle: "+1 555 123 4567" },
                  ].map((s, i) => (
                    <button
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${s.color}`}
                    >
                      <span className="text-xl">{s.icon}</span>
                      <div className="text-left">
                        <p className="font-semibold text-sm">{s.name}</p>
                        <p className="text-xs opacity-70">{s.handle}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Response time badge */}
              <div className="bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] rounded-3xl p-6 text-white">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">⚡</div>
                  <div>
                    <p className="font-bold text-lg">Fast Response</p>
                    <p className="text-white/80 text-sm">Average reply time under 2 hours during business hours.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12 fadeInUp">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500">Quick answers to common questions</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 fadeInUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-100 transition-all duration-300"
                >
                  <span className="font-semibold text-gray-800">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-[#ff6b6b] transition-transform duration-300 shrink-0 ml-4 ${openFaq === i ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
