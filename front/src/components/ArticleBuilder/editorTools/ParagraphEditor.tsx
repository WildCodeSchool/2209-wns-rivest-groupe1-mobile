import { useEffect, useState } from 'react';
import { useNewArticleBuilder } from '../../../contexts/NewArticleBuilderContext';
import Paragraph from '../elements/Paragraph';
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from 'react-icons/ai';

const ParagraphEditor = () => {
  const { handleElement, currentEditingElement, setCurrentEditingElement } = useNewArticleBuilder();

  const [text, setText] = useState<string>(currentEditingElement.element?.props.text);
  const [color, setColor] = useState<string>(currentEditingElement.element?.props.color);
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right' | 'justify'>(
    currentEditingElement.element?.props.alignment,
  );

  useEffect(() => {
    setText(currentEditingElement.element?.props.text);
    setColor(currentEditingElement.element?.props.color);
    setAlignment(currentEditingElement.element?.props.alignment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEditingElement.cellId]);

  useEffect(() => {
    setCurrentEditingElement({
      sectionId: currentEditingElement.sectionId as string,
      cellId: currentEditingElement.cellId as string,
      element: <Paragraph dataType="paragraph" text={text} color={color} alignment={alignment} />,
    });

    handleElement(
      currentEditingElement.sectionId as string,
      currentEditingElement.cellId as string,
      <Paragraph dataType="paragraph" text={text} color={color} alignment={alignment} />,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, color, alignment]);

  return (
    <div className="flex flex-col m-10 gap-y-5">
      {/* TEXT */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="text-button" className="text-xl text-white">
          Text
        </label>
        <textarea
          cols={30}
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>

      {/* COLOR */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="text-color" className="text-xl text-white">
          Color
        </label>
        <input
          type="color"
          id="text-color"
          name="text-color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label className="text-xl text-white">Alignment</label>
        <div className="flex justify-around mt-2">
          <AiOutlineAlignLeft
            className="text-white cursor-pointer w-9 h-9"
            onClick={() => setAlignment('left')}
          />
          <AiOutlineAlignCenter
            className="text-white cursor-pointer w-9 h-9"
            onClick={() => setAlignment('center')}
          />
          <AiOutlineAlignRight
            className="text-white cursor-pointer w-9 h-9"
            onClick={() => setAlignment('right')}
          />
        </div>
      </div>
    </div>
  );
};

export default ParagraphEditor;
