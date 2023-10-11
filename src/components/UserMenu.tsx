'use client';

import React, { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/hooks/useLogingModal';
import Image from 'next/image';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}
const MenuItem = ({ onClick, label }: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </div>
  );
};

interface AvatarProps {
  src: string;
}
const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={src}
    />
  );
};

interface UserMenuProps {
  currentUser: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const { onOpen: onOpenRegiter } = useRegisterModal();
  const { onOpen: onOpenLogin } = useLoginModal();

  return (
    <div className="relative h-9 ml-2">
      <div className="flex flex-row items-center gap-3 h-full">
        <div
          onClick={toggleOpen}
          className="md:py-1 md: px-2 border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer  shadow-sm hover:shadow-md transition hover:bg-accent hover:text-accent-foreground h-full"
        >
          <AiOutlineMenu />
          <Avatar src={currentUser?.image || '/user.svg'} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md  w-[10rem] bg-white overflow-hidden right-0 top-12 text-sm ">
          <div
            className="flex flex-col cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            {currentUser ? (
              <>
                <div className="hidden sm:flex sm:flex-col">
                  <MenuItem
                    onClick={() => signOut()}
                    label="Logout"
                  />
                </div>
                <div className="sm:hidden flex flex-col">
                  <MenuItem
                    onClick={() => router.push('/pricing')}
                    label="pricing"
                  />
                  <hr />
                  <MenuItem
                    onClick={() => signOut()}
                    label="Logout"
                  />
                </div>
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => router.push('/pricing')}
                  label="pricing"
                />
                <MenuItem
                  onClick={onOpenLogin}
                  label="Login"
                />
                <MenuItem
                  onClick={onOpenRegiter}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
