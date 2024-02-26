"use client";

import { Button } from "@/components/ui/button";
import { forwardRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Avatar from "react-avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const components = [
  {
    title: "Setting",
    href: "/notes/class/9",
  },
];

const ListItem = forwardRef(({ className, title, children, ...props }, ref) => {
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
});
ListItem.displayName = "ListItem";

const Buttons = () => {
  const pathName = usePathname();
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Avatar
                src="https://lh3.googleusercontent.com/ogw/ANLem4ayMEfh38I8fro76fl5RhnYHQVYNt8pCGpFb-ilsA=s32-c-mo"
                name="Divyansh Sahu"
                className="rounded-full cursor-pointer"
                size="40px"
              />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[250px] md:grid-cols-1 text-center lg:w-[250px] ">
                {components.map((component) => (
                  <ListItem
                    className={
                      pathName === component.href &&
                      "bg-gray-700 text-white hover:bg-gray-500 hover:text-white"
                    }
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
        </NavigationMenuList>
      </NavigationMenu>

      <Link href="/user/login">
        <Button
          className={
            pathName === "/user/login" &&
            "bg-white border text-black hover:text-white"
          }
        >
          Log In
        </Button>
      </Link>

      <Link className="hidden md:block" href={"/user/signup"}>
        <Button
          className={
            pathName === "/user/signup" &&
            "bg-white border text-black hover:text-white"
          }
        >
          Sign Up
        </Button>
      </Link>
    </>
  );
};

export default Buttons;
