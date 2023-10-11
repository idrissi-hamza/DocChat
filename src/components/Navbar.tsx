'use client';
import React from 'react';
import MaxWrapper from './MaxWrapper';
import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLogingModal';
import { User } from '@prisma/client';
import UserMenu from './UserMenu';

interface NavbarProps {
  currentUser: User | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  const { onOpen: openRegisterModal } = useRegisterModal();
  const { onOpen: openLoginModal } = useLoginModal();

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
          <div className=" items-center space-x-4 ">
            {!currentUser ? (
              <>
                <div className="hidden sm:flex">
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
                    variant="ghost"
                    size="sm"
                    onClick={openLoginModal}
                  >
                    Se connecter
                  </Button>
                  <Button
                    size="sm"
                    onClick={openRegisterModal}
                  >
                    S&apos;inscrire
                    <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Button>
                </div>
                <div className="sm:hidden flex">
                  <UserMenu currentUser={currentUser} />
                </div>
              </>
            ) : (
              <>
                <div className="hidden sm:flex">
                  <Link
                    href="/pricing"
                    className={buttonVariants({
                      variant: 'ghost',
                      size: 'sm',
                    })}
                  >
                    Pricing
                  </Link>
                  <UserMenu currentUser={currentUser} />
                </div>
                <div className="sm:hidden flex">
                  <UserMenu currentUser={currentUser} />
                </div>
              </>
            )}
          </div>
        </div>
      </MaxWrapper>
    </nav>
  );
};

export default Navbar;
