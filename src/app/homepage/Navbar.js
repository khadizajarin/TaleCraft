"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { AuthContext } from "../../lib/AuthProvider";
import API from "../../../utils/api";

// ✅ Navbar Component
const Navbar = () => {
  const router = useRouter();
  const { user, logOut } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  // ✅ Fetch User Data on Mount
  useEffect(() => {
    if (user?.email) {
      API.get("/users", { params: { email: user.email } })
        .then((response) => {
          setUserData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user?.email]);

  // ✅ Handle Logout
  const handleLogOut = () => {
    logOut()
      .then(() => {
        router.push("/");
        Swal.fire("Logged Out!", "You are logged out successfully!", "success");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="navbar bg-secondary bg-opacity-30">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-secondary">TaleCraft</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input border-b-2 border-b-secondary rounded-none bg-neutral bg-opacity-30 placeholder-secondary w-24 md:w-auto"
          />
        </div>

        {/* ✅ User Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full border-secondary border-2">
              <Image
                width={40}
                height={40}
                alt="User Profile"
                src={userData?.profilePicture || ""}
                onError={(e) => (e.target.style.display = "none")} // Hide broken images
                className={`w-10 h-10 rounded-full border-secondary border-2 ${
                  !userData?.profilePicture ? "hidden" : ""
                }`}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                {userData?.name || "User"} {/*  Show user name */}
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li onClick={handleLogOut}><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
