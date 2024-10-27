"use client"
import Image from 'next/image';
import { Almarai } from 'next/font/google'; 


// Initialize the font
const almarai = Almarai({
  subsets: ['arabic'],
  weight: [ '300', '400','700','800']
});



const Navbar = () => {
    return (
        <div className="navbar bg-secondary bg-opacity-30">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl text-secondary">TaleCraft</a>
        </div>
        <div className="flex-none gap-2">
            <div className="form-control">
            <input type="text" placeholder="Search" className="input border-b-2 border-b-secondary rounded-none bg-neutral bg-opacity-30 placeholder-secondary w-24 md:w-auto" />
            </div>
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-secondary border-2">
                <Image width={40} height={40}
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
            </ul>
            </div>
        </div>
        </div>
    );
};

export default Navbar;