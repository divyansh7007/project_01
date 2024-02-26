"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import verifyEmail from '@/schemas/verifyEmailSchema'


// eslint-disable-next-line @next/next/no-async-client-component
const Signup = async () => {
  const params = useSearchParams();
  const router = useRouter();
  const email = params.get('email');
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  if (!email) {
    return router.push('/user/signup')
  }

  const verification = await verifyEmail.findOne({ email }).exec();
  console.log(verification);


  return (
    <>
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <CardFooter>
        <Button className="w-full mt-8">
          Sign In
        </Button>
      </CardFooter>

    </>
  );
};

export default Signup;
