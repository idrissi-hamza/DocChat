'use client';

import React, { useState } from 'react';

import Modal from './Modal';
import Heading from '../Heading';
import useUploadModal from '@/app/hooks/useUploadModal';
import UploadDropzone from '../UploadDropzone';


const UploadModal = () => {
  const { isOpen, onClose: closeUploadModal } = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);

  const bodyContent = (
    <div className="flex  flex-col gap-4  w-full  ">
      <UploadDropzone />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title="Upload modal"
      actionLabel="Continuer"
      onClose={closeUploadModal}
      onSubmit={() => { }}
      body={bodyContent}
    />
  );
};

export default UploadModal;
