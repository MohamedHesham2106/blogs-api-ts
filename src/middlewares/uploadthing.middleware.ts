import { createUploadthing, type FileRouter } from 'uploadthing/express';

const f = createUploadthing();

export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '16MB',
      maxFileCount: 1,
    },
  }).onUploadComplete(async data => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
