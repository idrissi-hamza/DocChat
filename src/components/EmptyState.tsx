'use client';

import Heading from './Heading';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters.',
}: EmptyStateProps) => {
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
