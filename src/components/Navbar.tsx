import React from 'react';
import MaxWrapper from './MaxWrapper';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link
            href="/"
            className="flex z-40 font-semibold"
          >DocChat.</Link>
          
        </div>
      </MaxWrapper>
    </nav>
  );
};

export default Navbar;
