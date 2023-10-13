'use client';

import { Button } from './ui/button';
import useUploadModal from '@/app/hooks/useUploadModal';

const UploadButton = () => {
  const { onOpen: openUploadModal } = useUploadModal();

  return <Button onClick={openUploadModal}>Upload</Button>;
};

export default UploadButton;
