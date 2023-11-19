import getCurrentUser from '@/app/actions/getCurrentUser';
import db from '@/lib/prisma';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

import { getPineconeClient } from '@/lib/pinecone';

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(async ({ req }) => {
      const user = await getCurrentUser();
      if (!user || !user.id) throw new Error('Unauthorized');

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: 'PROCESSING',
        },
      });

      try {
        const res = await fetch(
          `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
        );

        const blob = await res.blob();

        const loader = new PDFLoader(blob);

        const docs = await loader.load();

        const pinecone = await getPineconeClient();
        const pineconeIndex = pinecone.Index('docchat');

        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        });

        await PineconeStore.fromDocuments(docs, embeddings, {
          //@ts-ignore
          pineconeIndex,
          namespace: createdFile.id,
        });

        await db.file.update({
          data: {
            uploadStatus: 'SUCCESS',
          },
          where: {
            id: createdFile.id,
          },
        });
      } catch (err) {
        await db.file.update({
          data: {
            uploadStatus: 'FAILED',
          },
          where: {
            id: createdFile.id,
          },
        });
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
