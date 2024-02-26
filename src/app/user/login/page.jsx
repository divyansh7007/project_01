import { Avatar } from "@/components/ui/avatar";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default async function Component() {
    const onSubmit = async (formData) => {
        'use server';
        const rawFormData = {
            username: formData.get('username'),
            password: formData.get('password'),
        }
    }
  return (
    <form action={onSubmit} className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8">
        <CardHeader>
          <div className="flex justify-center items-center">
            <Avatar
              alt="Company Logo"
              className="h-12 w-12"
              src="/placeholder.svg?height=100&width=100"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
        </CardHeader>
        <CardContent className="mt-8 space-y-6">
          <input name="remember" type="hidden" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                autoComplete="username"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="username"
                name="username"
                placeholder="Username"
                required
                type="text"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                autoComplete="current-password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="password"
                name="password"
                placeholder="Password"
                required
                type="password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 items-center justify-between">
          <div className="text-sm">
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500"
              href="#"
            >
              Forgot your password?
            </Link>
          </div>
          <Button type='submit' className="w-full">Sign in</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
