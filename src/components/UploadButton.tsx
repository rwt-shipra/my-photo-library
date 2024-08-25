"use client";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Upload } from "lucide-react";
import { UseResources } from "@/hooks/use-resources";
import { CloudinaryResource } from "@/type/cloudinary";

const UploadButton = () => {
  const { addResources } = UseResources({
    disableFetch: true,
    tag: "media",
  });
  function handelOnSuccess(results: CloudinaryUploadWidgetResults) {
    addResources([results.info as unknown as CloudinaryResource]);
  }
  return (
    <CldUploadButton
      signatureEndpoint="/api/cloudinaryApi"
      options={{
        autoMinimize: true,
        tags: [String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG)],
      }}
      onSuccess={handelOnSuccess}
    >
      <span className="flex gap-4 text-center">
        <Upload size={20} />
        Upload
      </span>
    </CldUploadButton>
  );
};

export default UploadButton;
