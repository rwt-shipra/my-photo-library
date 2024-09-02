import { v2 as cloudinary } from "cloudinary";
import { getCldImageUrl } from "next-cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function POST(request: Request) {
  const { publicId } = await request.json();

  const backgroundRemoveUrl = getCldImageUrl({
    src: publicId,
    removeBackground: true,
    format: "png",
    quality: "default",
    version: Date.now(),
  });

  async function checkStatus(url: string) {
    const response = await fetch(url);
    if (response.ok) {
      return true;
    }
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(undefined);
      }, 5000);
    });
    return await checkStatus(url);
  }
  await checkStatus(backgroundRemoveUrl);
  const uploadOptions: Record<string, string | boolean | Array<string>> = {};
  uploadOptions.tags = ["background-removed", `orignal=${publicId}`];

  const result = await cloudinary.uploader.upload(
    backgroundRemoveUrl,
    uploadOptions
  );
  const creationalUrl = getCldImageUrl({
    width: 1200,
    height: 1200,
    crop: { type: "fill", source: true, gravity: "center" },
    src: publicId,
    grayscale: true,
    overlays: [{ publicId: result.public_id }],
    version: Date.now(),
  });
  return Response.json({
    url: creationalUrl,
  });
}
