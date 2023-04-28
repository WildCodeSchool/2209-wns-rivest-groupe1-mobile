import { useEffect, useState } from 'react';
import { useNewArticleBuilder } from '../../../contexts/NewArticleBuilderContext';
import Image from '../elements/Image';
import { AiOutlineAlignLeft, AiOutlineAlignCenter, AiOutlineAlignRight } from 'react-icons/ai';

const ImageEditor = () => {
  const { handleElement, currentEditingElement, setCurrentEditingElement } = useNewArticleBuilder();

  const [src, setSrc] = useState<string>(currentEditingElement.element?.props.src);
  const [alt, setAlt] = useState<string>(currentEditingElement.element?.props.alt);
  const [alignment, setAlignment] = useState<'start' | 'center' | 'end'>(
    currentEditingElement.element?.props.alignment,
  );

  useEffect(() => {
    setSrc(currentEditingElement.element?.props.src);
    setAlt(currentEditingElement.element?.props.alt);
    setAlignment(currentEditingElement.element?.props.alignment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEditingElement.cellId]);

  useEffect(() => {
    setCurrentEditingElement({
      sectionId: currentEditingElement.sectionId as string,
      cellId: currentEditingElement.cellId as string,
      element: <Image dataType="img" src={src} alt={alt} alignment={alignment} />,
    });

    handleElement(
      currentEditingElement.sectionId as string,
      currentEditingElement.cellId as string,
      <Image dataType="img" src={src} alt={alt} alignment={alignment} />,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, alt, alignment]);

  return (
    <div className="flex flex-col m-10 gap-y-5">
      {/* TEXT */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="src-url" className="text-xl text-white">
          Source url
        </label>
        <input
          id="src-url"
          name="src-url"
          type="text"
          onChange={(e) => setSrc(e.target.value)}
          value={src}
        />
      </div>

      {/* TEXT */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="alt-img" className="text-xl text-white">
          Alt
        </label>
        <input
          id="alt-img"
          name="alt-img"
          type="text"
          onChange={(e) => setAlt(e.target.value)}
          value={alt}
        />
      </div>

      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label className="text-xl text-white">Alignment</label>
        <div className="flex justify-around mt-2">
          <AiOutlineAlignLeft
            className="text-white cursor-pointer w-9 h-9"
            onClick={() => setAlignment('start')}
          />
          <AiOutlineAlignCenter
            className="text-white cursor-pointer w-9 h-9"
            onClick={() => setAlignment('center')}
          />
          <AiOutlineAlignRight
            className="text-white cursor-pointer w-9 h-9"
            onClick={() => setAlignment('end')}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
