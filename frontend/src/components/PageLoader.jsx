import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PageLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true); setProgress(20);
    const t1 = setTimeout(() => setProgress(60), 100);
    const t2 = setTimeout(() => setProgress(85), 250);
    const t3 = setTimeout(() => { setProgress(100); setTimeout(() => { setLoading(false); setProgress(0); }, 200); }, 400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [location.pathname]);

  if (!loading) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px]">
      <div className="h-full bg-gradient-to-r from-[#ff6b6b] to-[#ee5a6f] transition-all duration-300 ease-out shadow-[0_0_8px_rgba(255,107,107,0.7)]" style={{ width:`${progress}%` }} />
    </div>
  );
}
