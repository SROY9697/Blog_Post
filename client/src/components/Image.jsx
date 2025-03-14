import { IKImage } from "imagekitio-react";

function Image({ src, className }) {
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      path={src}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      className={className}
    />
  );
}

export default Image;
