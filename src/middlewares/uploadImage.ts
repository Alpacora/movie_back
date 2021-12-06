import firebase from 'firebase-admin';
import { Request, Response, NextFunction } from "express";

// export function uploadImage(request: Request, response: Response, next: NextFunction) {
//   if (!request.file) {
//     return response.json({ message: 'No Image' });
//   }

//   const bucket = firebase.storage().bucket();

//   const image = request.file;

//   const file = bucket.file(image.originalname.replace(/ /g, ''));

//   const stream = file.createWriteStream({
//     metadata: {
//       contentType: image.mimetype
//     }
//   });

//   stream.on('finish', async () => {
//     await file.makePublic();
//     request.file.firebaseurl = file.publicUrl();
//     next();
//   });

//   stream.end(image.buffer);

// }

export async function uploadImage(userId: string, file, newFileName: string) {
  const bucket = firebase.storage().bucket();

  const image = file;

  const fileRef = bucket.file(`${userId}/${newFileName}_${userId}`);

  const stream = fileRef.createWriteStream({
    metadata: {
      contentType: image.mimetype,
    }
  });

  stream.end(image.buffer);

  return await new Promise((resolve, reject) => {
    stream.on('finish', async () => {
      await fileRef.makePublic();
      resolve(fileRef.publicUrl())
    });

    stream.on('error', (e) => {
      reject(e.message);
    });
  })
}
