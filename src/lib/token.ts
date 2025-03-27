import * as crypto from "crypto";

// export const encryptString = (text: string) => {
//   console.log({ as: process.env.NEXT_PUBLIC_ENCRYPTION_KEY });

//   // Generate a random initialization vector
//   const iv = crypto?.randomBytes(16);

//   // Create cipher using key and iv
//   const cipher = crypto?.createCipheriv(
//     "aes-256-cbc",
//     process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string,
//     iv
//   );

//   // Encrypt the text
//   let encrypted = cipher.update(text, "utf8", "hex");
//   encrypted += cipher.final("hex");

//   // Prepend the IV to the encrypted text
//   return `${iv.toString("hex")}:${encrypted}`;
// };

export const encryptString = (text: string) => {
  // Generate a random initialization vector
  const iv = crypto.randomBytes(16);

  // Create cipher using key and iv
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string,
    iv
  );

  // Encrypt the text
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Prepend the IV to the encrypted text
  return `${iv.toString("hex")}:${encrypted}`;
};
