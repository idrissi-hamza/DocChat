import Image from 'next/image';
import React from 'react';

const ImageSection = ({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) => {
  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <div className="mt-16 flow-root sm:mt-24">
        <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
          <Image
            alt={alt}
            src={src}
            width={width}
            height={height}
            quality={100}
            className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageSection;
