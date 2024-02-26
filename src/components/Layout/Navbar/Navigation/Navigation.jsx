/* eslint-disable react/display-name */
"use client";

import { forwardRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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

const ListItem = forwardRef(
    ({ className, title, children, ...props }, ref) => {
      return (
        <li>
          <NavigationMenuLink asChild>
            <Link
              ref={ref}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                className
              )}
              {...props}
            >
              <div className="text-sm font-medium leading-none">{title}</div>
            </Link>
          </NavigationMenuLink>
        </li>
      );
    }
  );
  ListItem.displayName = "ListItem"
  

const Navigation = () => {
    const pathName = usePathname();
  return (
    <NavigationMenu>
      <NavigationMenuList>
      <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Classess</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 text-center lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  className={pathName === component.href && 'bg-gray-700 text-white hover:bg-gray-500 hover:text-white'}
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/admin" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Admin
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
};

export default Navigation;
