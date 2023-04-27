import { useMemo } from 'react';

interface IImage {
  dataType: 'img';
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
}

const Image = ({ src, alt, width, height }: IImage) => {
  const imageComponent = useMemo(() => {
    return <img src={src} alt={alt} style={{ width, height }} />;
  }, [src, alt, width, height]);

  return <>{imageComponent}</>;
};

export default Image;
