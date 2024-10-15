import Image from "next/image";
import background from "@/assets/Blog-Site-01.png";
import { Almarai } from 'next/font/google'; // Import the font
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FaFacebookF , FaGoogle} from "react-icons/fa6";

// Initialize the font
const almarai = Almarai({
  subsets: ['arabic'],
  weight: [ '300', '400','700','800']
});

export default function Home() {
  return (
    <div className={`${almarai.className} h-screen w-screen overflow-hidden`}>
      <div
        className="bg-no-repeat bg-cover bg-center h-full w-full flex justify-center items-center"
        style={{ backgroundImage: `url(${background.src})` }}
      >
         <div className={`${almarai.className}  `}>
          <div className="w-[60rem] h-[30rem] flex">
            <div className="bg-secondary w-[60rem] h-[30rem] p-8">
              <div className="text-primary flex gap-6 justify-center items-center mb-4">
                <div>
                  <h1 className="text-2xl font-semibold text-left">REGISTRATION</h1>
                  <hr className="border-t-2 border-primary w-[15rem]"></hr>
                </div>
                
                <div className="flex justify-center gap-4 mb-4">
                  <button className="bg-primary text-secondary flex items-center justify-center text-xl w-10 h-10"><FaFacebookF /></button>
                  <button className="bg-primary text-secondary flex items-center justify-center text-xl w-10 h-10"><FaGoogle /></button>
                </div>
              </div>
              
              <form className="space-y-4 flex flex-col justify-center items-center">
                <div>
                  <label className="block text-primary mb-2" htmlFor="email">Email</label>
                  <input className="w-[23rem] h-10 px-3 bg-primary bg-opacity-20 text-primary " type="email" id="email" />
                </div>
                <div>
                  <label className="block text-primary mb-2" htmlFor="password">Password</label>
                  <input className="w-[23rem] h-10 px-3 bg-primary bg-opacity-20 text-primary " type="password" id="password" />
                </div>
                <div className="flex justify-start ">
                  <input className="mr-2 border-primary bg-secondary" type="checkbox" id="remember" />
                  <label className="text-primary" htmlFor="remember">Remember me</label>
                </div>
                <div>
                  <button className="h-10 w-[8rem] bg-primary text-secondary py-2  font-bold">SIGN UP</button>
                </div>
              </form>
              <p className="text-center text-primary mt-4">Already have an account? <a className="" href="#">SIGN IN</a></p>
            </div>
            <div className="bg-primary w-[60rem] h-[30rem] flex items-end justify-end text-right pr-16 pb-16">
              <h2 className="text-secondary text-4xl font-bold">Creating <br/> New <br/> Account</h2>
            </div>
          </div>
         </div>
      </div>
    </div>
  );
}
