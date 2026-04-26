import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const LoginPop = ({ setIsLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [loginState, setLoginState] = useState("login");
  const [data, setData]             = useState({ name:"", email:"", password:"" });
  const [loading, setLoading]       = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors]         = useState({});

  const validate = () => {
    const e = {};
    if (loginState !== "login" && !data.name.trim()) e.name = "Name is required";
    if (!data.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = "Email is invalid";
    if (!data.password) e.password = "Password is required";
    else if (loginState !== "login" && data.password.length < 8) e.password = "Password must be at least 8 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const collect = (e) => {
    const { name, value } = e.target;
    setData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]:"" }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post(`${url}/api/auth/${loginState === "login" ? "login" : "register"}`, data);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("food_flow_token", res.data.token);
        toast.success(res.data.message);
        setIsLogin(false);
      } else { toast.error(res.data.message); }
    } catch(err) { toast.error(err.response?.data?.message || "Something went wrong!"); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    const h = (e) => { if(e.key==="Escape") setIsLogin(false); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [setIsLogin]);

  const inputCls = (field) => `w-full px-4 py-3 pl-12 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-300 ${errors[field] ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#ff6b6b] focus:bg-white"}`;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] fadeIn px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden scaleIn">
        <div className="bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{loginState==="login" ? "Welcome Back!" : "Join Us Today!"}</h2>
              <p className="text-white/90">{loginState==="login" ? "Sign in to your account to continue" : "Create an account to get started"}</p>
            </div>
            <button onClick={() => setIsLogin(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 hover:rotate-90">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleAuth} className="p-8 space-y-6">
          {loginState === "register" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <input type="text" name="name" value={data.name} onChange={collect} placeholder="Enter your full name" className={inputCls("name")} />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <input type="email" name="email" value={data.email} onChange={collect} placeholder="Enter your email" className={inputCls("email")} />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input type={showPassword?"text":"password"} name="password" value={data.password} onChange={collect} placeholder="Enter your password" className={`${inputCls("password")} pr-12`} />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showPassword ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                  : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></>}
                </svg>
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button type="submit" disabled={loading} className="btn-primary text-white font-bold py-4 rounded-xl w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3">
            {loading ? (<><svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>Processing...</>)
            : (<>{loginState==="login" ? "Sign In" : "Create Account"}<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></>)}
          </button>

          {loginState==="register" && (
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <input type="checkbox" required className="mt-1 w-4 h-4 accent-[#ff6b6b]" />
              <p>By creating an account, you agree to our <a href="#" className="text-[#ff6b6b] hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-[#ff6b6b] hover:underline font-medium">Privacy Policy</a></p>
            </div>
          )}

          <div className="text-center">
            <p className="text-gray-600">
              {loginState==="login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button type="button" onClick={() => { setLoginState(loginState==="login"?"register":"login"); setErrors({}); setData({name:"",email:"",password:""}); }} className="text-[#ff6b6b] font-semibold hover:underline">
                {loginState==="login" ? "Sign up here" : "Sign in here"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPop;
