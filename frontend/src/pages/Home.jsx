import { useState } from "react";
import Header from "../components/Header";
import ExploreMenu from "../components/ExploreMenu";
import FoodDisplay from "../components/FoodDisplay";
import Footer from "../components/Footer";
import MobileApp from "../components/MobileApp";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <div className="px-[8%] pt-24">
        <Header />
      </div>
      <Features />
      <div className="px-[8%] py-12">
        <ExploreMenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
      </div>
      <Testimonials />
      <div className="px-[8%] py-12">
        <MobileApp />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
