import { NextResponse } from 'next/server';

import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/lib/prisma';

interface ParamsType {
  fileId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: ParamsType }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ message: 'no user found' });
  }

  const { fileId } = params;

  if (!fileId || typeof fileId !== 'string') {
    throw new Error('Invalid ID');
  }

  const file = await prisma.file.deleteMany({
    where: {
      id: fileId,
      userId: currentUser?.id,
    },
  });

  return NextResponse.json(file);
}
