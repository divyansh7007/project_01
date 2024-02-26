import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '../../ui/button';
import Buttons from './Buttons';
import Navigation from './Navigation/Navigation';
import Hamburger from './hamburger/Hamburger'

const Navbar = () => {
  return (
    <header className='z-40 fixed top-0 w-screen bg-white'>
        <div className='w-full px-5 md:px-12 lg:px-20 py-2'>
        <nav className='flex items-center justify-between w-full border-b py-2 px-4'>
            <div className="hamburger lg:hidden">
                <Hamburger />
            </div>
            <div className='flex items-center justify-center space-x-2'>
                <Link href={'/'}>
                <Avatar>
                    <AvatarImage src={process.env.NEXT_PUBLIC_LOGO} />
                    <AvatarFallback>BIO</AvatarFallback>
                </Avatar>
                </Link>
                <Link className='hover:underline' href={'/'}>
                <h2 className='font-bold hidden md:block text-2xl hover:underline'>
                    VEER SIR
                </h2>
                </Link>
            </div>
            <div className='hidden lg:block'>
                <Navigation />
            </div>
            <div className='flex items-center justify-center space-x-2'>
                <Buttons />
            </div>
        </nav>
        </div>
    </header>
  )
}

export default Navbar