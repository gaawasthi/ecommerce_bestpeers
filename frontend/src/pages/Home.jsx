import React, { useEffect } from "react";
import Products from "./customers/Products";
import AddBanners from "./Addbanners";
import ElectronicsProducts from "./customers/ElectronicsProducts";
import FashionProduct from "./customers/FashionProduct";
import SportsProducts from "./customers/SportsProducts";

const Home = () => {

    useEffect(()=>{
 window.scrollTo({ top: 0, behavior: 'smooth' });
    },[])
  return (
    <div className=" w-full mx-auto space-y-12">
    

      <section>
        <AddBanners />
      </section>

      <section>
        <ElectronicsProducts />
      </section>

      <section>
        <FashionProduct />
      </section>

      <section>
        <SportsProducts />
      </section>
    </div>
  );
};

export default Home;
