"use client";
import { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const components = [
    {
      title: "Class 9",
      href: "/notes/class/9",
    },
    {
      title: "Class 10",
      href: "/notes/class/10",
    },
    {
      title: "Class 11",
      href: "/notes/class/11",
    },
    {
      title: "class 12",
      href: "/notes/class/12",
    },
  ];

const Hamburger = () => {
    const [openMenu, setOpenMenu] = useState(false)
  return (
    <>
      <Sheet className="lg:hidden">
        <SheetTrigger asChild>
          <button variant="outline">
            <GiHamburgerMenu className="text-3xl" />
          </button>
        </SheetTrigger>
        <SheetContent side={"left"}>
            <div className="flex flex-col items-center justify-center">
              <Link className="border border-b-0 w-full text-center mt-4 py-1 font-bold hover:bg-slate-600 hover:text-white" href={'/'}>
                Home
              </Link>  
              <button onClick={() => {
                setOpenMenu(!openMenu)
              }}
              className="flex items-center justify-center icspace-x-1 border border-b-0 w-full text-center py-1 font-bold hover:bg-slate-600 hover:text-white" href={'/'}>
                Classes <IoIosArrowDown className={`${ !openMenu && "rotate-180" }`} />
              </button>

              {
                components.map((item, key) => {
                    return <Link key={key} className={`${ openMenu && "hidden" } border border-b-0 w-full text-center py-1 font-bold hover:bg-slate-600 hover:text-white`} href={item.href}>
                    {item.title}
                  </Link>  
                })
              }

              <Link className="border w-full text-center py-1 font-bold hover:bg-slate-600 hover:text-white" href={'/admin'}>
                Admin
              </Link>  
            </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Hamburger;
