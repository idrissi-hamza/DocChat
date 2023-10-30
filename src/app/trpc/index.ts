import { TRPCError } from '@trpc/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { getServerSession } from 'next-auth';
import db from '@/lib/prisma';
import { z } from 'zod';

export const appRouter = router({
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;
    return db.file.findMany({
      where: {
        userId,
      },
    });
  }),
  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const { id: fileId } = input;

      const file = await db.file.findFirst({
        where: {
          id: fileId,
          userId,
        },
      });

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' });

      await db.file.delete({
        where: {
          id: fileId,
          userId,
        },
      });
      return file;
    }),
});

export type AppRouter = typeof appRouter;
