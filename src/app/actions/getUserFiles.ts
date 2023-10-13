import prisma from '@/lib/prisma';

export default async function getUserFiles(userId: string) {
  try {
    const files = await prisma.file.findMany({
      where: {
        userId,
      },
    });
    return files;
  } catch (error: any) {
    throw new Error(error);
  }
}
