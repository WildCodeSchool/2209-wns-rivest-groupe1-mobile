import { useMemo } from 'react';

interface IImage {
  dataType: 'img';
  src: string;
  alt: string;
  alignment: 'start' | 'center' | 'end';
}

const Image = ({ src, alt, alignment }: IImage) => {
  const imageComponent = useMemo(() => {
    return <img src={src} alt={alt} />;
  }, [src, alt]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: alignment }}>{imageComponent}</div>
    </>
  );
};

export default Image;
