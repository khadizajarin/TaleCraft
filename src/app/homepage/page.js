"use client"
import background from "@/assets/image.png";
import { Almarai } from 'next/font/google'; // Import the font
import AnimatedBackground from "./Animated";


// Initialize the font
const almarai = Almarai({
  subsets: ['arabic'],
  weight: [ '300', '400','700','800']
});


const page = () => {
    return (
        <div className={`${almarai.className} h-screen w-screen `}>
      <div
        className="bg-no-repeat bg-cover bg-center h-full w-full flex justify-center items-center"
        style={{ backgroundImage: `url()` }}
      >
        <AnimatedBackground></AnimatedBackground>


      </div>
            
        </div>
    );
};

export default page;