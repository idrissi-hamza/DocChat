import React from 'react';
import MaxWrapper from './MaxWrapper';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link
            href="/"
            className="flex z-40 font-semibold"
          >
            DocChat.
          </Link>
          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link
                href="/pricing"
                className={buttonVariants({
                  variant: 'ghost',
                  size: 'sm',
                })}
              >
                Pricing
              </Link>
              <Button
                  variant= 'ghost'
                  size= 'sm'
              >
                Se connecter
              </Button>
              <Button
                  size= 'sm'
                
              >
                S&apos;inscrire
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Button>
            </>
          </div>
        </div>
      </MaxWrapper>
    </nav>
  );
};

export default Navbar;
