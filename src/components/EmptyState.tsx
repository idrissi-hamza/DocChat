'use client';

import useLoginModal from '@/app/hooks/useLogingModal';
import Heading from './Heading';
import { useEffect } from 'react';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState = ({
  title = 'UNAUTHORIZED',
  subtitle = '',
}: EmptyStateProps) => {

  const { onOpen } = useLoginModal();
  useEffect(() => {
    const timer = setTimeout(() => {
      onOpen()
    }, 500);


    return () => clearTimeout(timer);

  }, [])

  return (
    <div className=" flex flex-col gap-2 justify-center items-center h-full  mt-10">
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
    </div>
  );
};

export default EmptyState;
