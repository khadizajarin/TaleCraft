"use client"
import background from "@/assets/image.png";
import { Almarai } from 'next/font/google'; // Import the font
import Navbar from "./Navbar";
// import PrivateRoute from "../components/PrivateRoute";


// Initialize the font
const almarai = Almarai({
  subsets: ['arabic'],
  weight: [ '300', '400','700','800']
});





const page = () => {
    return (

      // <PrivateRoute>
        <div className={`${almarai.className} h-screen relative bg-no-repeat bg-cover bg-center `}  style={{ backgroundImage: `url(${background.src})` }}>
        <div className="max-w-5xl mx-auto ">
          <Navbar className='absolute'></Navbar>
        </div>
                      
          


        
        </div>
      // </PrivateRoute>
        
    );
};

export default page;