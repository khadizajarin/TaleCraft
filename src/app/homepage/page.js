"use client"
import { useEffect, useState } from "react";
import background from "@/assets/image.png";
import { Almarai } from 'next/font/google';
import Navbar from "./Navbar";
import PrivateRoute from "../components/PrivateRoute";

const almarai = Almarai({
  subsets: ['arabic'],
  weight: ['300', '400', '700', '800']
});

const Page = () => {
    const [bgImage, setBgImage] = useState("");

    useEffect(() => {
        setBgImage(`url(${background.src})`);
    }, []);

    return (
        <PrivateRoute>
            <div className={`${almarai.className} h-screen relative bg-no-repeat bg-cover bg-center`} style={{ backgroundImage: bgImage }}>
                <div className="max-w-5xl mx-auto">
                    <Navbar className="absolute" />
                </div>
            </div>
        </PrivateRoute>
    );
};

export default Page;
