import Link from 'next/link';
import React from 'react';

const Step = ({
  step,
  title,
  description,
  linkHref,
  linkText,
}: {
  step: string;
  title: string;
  description: string;
  linkHref?: string;
  linkText?: string;
}) => {
  return (
    <li className="md:flex-1">
      <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4            ">
        <span className="text-sm font-medium text-indigo-600">{step}</span>
        <span className="text-xl font-semibold">{title} </span>
        <span className="mt-2 text-zinc-700">
          {description}
          {linkHref && (
            <Link
              href={linkHref}
              className="text-indigo-700 underline underline-offset-2 pl-2"
            >
              {linkText}
            </Link>
          )}
        </span>
      </div>
    </li>
  );
};

export default Step;
