"use client";
import { useGlobalContext } from "@/context/globalContext";
import { LogIn, UserPlus, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Profile from "./Profile";

function Header() {
  const { isAuthenticated } = useGlobalContext();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

return (
    <header className="fixed top-0 left-0 w-full px-4 md:px-10 py-6 bg-gradient-to-r from-[#1a1a2e] to-[#16213e] text-gray-200 flex justify-between items-center z-50">
      <Link href={"/"} className="flex items-center gap-2 z-20">
        <Image
          src="/joblogo-removebg-preview.png"
          alt="logo"
          width={45}
          height={45}
          className="rounded-full"
        />
        <h1 className="font-extrabold text-2xl text-[#4fd1c5] hidden sm:block">
          JobCamr
        </h1>
      </Link>

      {/* Menu Button for Mobile */}
      <button
        className="lg:hidden z-20 text-[#4fd1c5] hover:text-[#38b2ac] transition-colors"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center gap-8">
        <li className="flex items-center gap-4">
          <Link
            href={"/findwork"}
            className={`py-2 px-6 rounded-md transition-all duration-300 hover:bg-[#4fd1c5]/10 ${
              pathname === "/findwork"
                ? "text-[#4fd1c5] border-[#4fd1c5] border bg-[#4fd1c5]/10"
                : ""
            }`}
          >
            Find Work
          </Link>
          <Link
            href={"/myjobs"}
            className={`py-2 px-6 rounded-md transition-all duration-300 hover:bg-[#4fd1c5]/10 ${
              pathname === "/myjobs"
                ? "text-[#4fd1c5] border-[#4fd1c5] border bg-[#4fd1c5]/10"
                : ""
            }`}
          >
            My Jobs
          </Link>
          <Link
            href={"/post"}
            className={`py-2 px-6 rounded-md transition-all duration-300 hover:bg-[#4fd1c5]/10 ${
              pathname === "/post"
                ? "text-[#4fd1c5] border-[#4fd1c5] border bg-[#4fd1c5]/10"
                : ""
            }`}
          >
            Post a Job
          </Link>
        </li>
      </ul>

      {/* Desktop Auth Buttons */}
      <div className="hidden lg:flex items-center gap-4">
        {isAuthenticated ? (
          <Profile />
        ) : (
          <div className="flex items-center gap-6">
            <Link
              href="/login"
              className="py-2 px-6 rounded-md border flex items-center gap-4 bg-[#4fd1c5] text-white border-[#4fd1c5] hover:bg-[#38b2ac] transition-all duration-300"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
            <Link
              href="/register"
              className="py-2 px-6 rounded-md border flex items-center gap-4 border-[#4fd1c5] text-[#4fd1c5] hover:bg-[#4fd1c5]/10 transition-all duration-300"
            >
              <UserPlus className="w-4 h-4" />
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 bg-[#1a1a2e] transform transition-transform duration-300 ease-in-out z-10 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col pt-24 px-6 gap-6">
          <Link
            href={"/findwork"}
            className={`py-2 px-6 rounded-md transition-all duration-300 hover:bg-[#4fd1c5]/10 ${
              pathname === "/findwork"
                ? "text-[#4fd1c5] border-[#4fd1c5] border bg-[#4fd1c5]/10"
                : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Find Work
          </Link>
          <Link
            href={"/myjobs"}
            className={`py-2 px-6 rounded-md transition-all duration-300 hover:bg-[#4fd1c5]/10 ${
              pathname === "/myjobs"
                ? "text-[#4fd1c5] border-[#4fd1c5] border bg-[#4fd1c5]/10"
                : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            My Jobs
          </Link>
          <Link
            href={"/post"}
            className={`py-2 px-6 rounded-md transition-all duration-300 hover:bg-[#4fd1c5]/10 ${
              pathname === "/post"
                ? "text-[#4fd1c5] border-[#4fd1c5] border bg-[#4fd1c5]/10"
                : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Post a Job
          </Link>
          
          {!isAuthenticated && (
            <div className="flex flex-col gap-4 mt-6">
              <Link
                href={"/login"}
                className="py-2 px-6 rounded-md border flex items-center gap-4 bg-[#4fd1c5] text-white border-[#4fd1c5] hover:bg-[#38b2ac] transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                href={"/register"}
                className="py-2 px-6 rounded-md border flex items-center gap-4 border-[#4fd1c5] text-[#4fd1c5] hover:bg-[#4fd1c5]/10 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus className="w-4 h-4" />
                Register
              </Link>
            </div>
          )}
          
          {isAuthenticated && (
            <div className="mt-6">
              <Profile />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;