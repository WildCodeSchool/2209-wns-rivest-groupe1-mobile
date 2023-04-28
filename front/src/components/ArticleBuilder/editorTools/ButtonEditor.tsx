import { useEffect, useState } from 'react';
import Button from '../elements/Button';
import { useNewArticleBuilder } from '../../../contexts/NewArticleBuilderContext';
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from 'react-icons/ai';

const ButtonEditor = () => {
  const { handleElement, currentEditingElement, setCurrentEditingElement } = useNewArticleBuilder();

  const [textButton, setTextButton] = useState(currentEditingElement.element?.props.title);
  const [bgColor, setBgColor] = useState(currentEditingElement.element?.props.backgroundColor);
  const [fontSize, setFontSize] = useState(
    currentEditingElement.element?.props.fontSize.replace(/\D+/g, ''),
  );
  const [fontColor, setFontColor] = useState(currentEditingElement.element?.props.fontColor);
  const [fontWeight, setFontWeight] = useState(currentEditingElement.element?.props.fontWeight);
  const [padding, setPadding] = useState(
    currentEditingElement.element?.props.padding.replace(/\D+/g, ''),
  );
  const [margin, setMargin] = useState(
    currentEditingElement.element?.props.margin.replace(/\D+/g, ''),
  );
  const [borderWidth, setBorderWidth] = useState(
    currentEditingElement.element?.props.borderWidth.replace(/\D+/g, ''),
  );
  const [borderColor, setBorderColor] = useState(currentEditingElement.element?.props.borderColor);
  const [borderRadius, setBorderRadius] = useState(
    currentEditingElement.element?.props.borderRadius.replace(/\D+/g, ''),
  );
  const [alignment, setAlignment] = useState<'start' | 'center' | 'end'>(
    currentEditingElement.element?.props.alignment,
  );

  useEffect(() => {
    setTextButton(currentEditingElement.element?.props.title);
    setBgColor(currentEditingElement.element?.props.backgroundColor);
    setFontSize(currentEditingElement.element?.props.fontSize.replace(/\D+/g, ''));
    setFontColor(currentEditingElement.element?.props.fontColor);
    setFontWeight(currentEditingElement.element?.props.fontWeight);
    setPadding(currentEditingElement.element?.props.padding.replace(/\D+/g, ''));
    setMargin(currentEditingElement.element?.props.margin.replace(/\D+/g, ''));
    setBorderWidth(currentEditingElement.element?.props.borderWidth.replace(/\D+/g, ''));
    setBorderColor(currentEditingElement.element?.props.borderColor);
    setBorderRadius(currentEditingElement.element?.props.borderRadius.replace(/\D+/g, ''));
    setAlignment(currentEditingElement.element?.props.alignment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEditingElement.cellId]);

  useEffect(() => {
    setCurrentEditingElement({
      sectionId: currentEditingElement.sectionId as string,
      cellId: currentEditingElement.cellId as string,
      element: (
        <Button
          title={textButton}
          backgroundColor={bgColor}
          fontSize={`${fontSize}px`}
          fontColor={fontColor}
          fontWeight={fontWeight}
          padding={`${padding}px`}
          margin={`${margin}px`}
          borderWidth={`${borderWidth}px`}
          borderColor={borderColor}
          borderRadius={`${borderRadius}px`}
          alignment={alignment}
          dataType="button"
        />
      ),
    });
    handleElement(
      currentEditingElement.sectionId as string,
      currentEditingElement.cellId as string,
      <Button
        title={textButton}
        backgroundColor={bgColor}
        fontSize={`${fontSize}px`}
        fontColor={fontColor}
        fontWeight={fontWeight}
        padding={`${padding}px`}
        margin={`${margin}px`}
        borderWidth={`${borderWidth}px`}
        borderColor={borderColor}
        borderRadius={`${borderRadius}px`}
        alignment={alignment}
        dataType="button"
      />,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    textButton,
    bgColor,
    fontSize,
    fontColor,
    fontWeight,
    padding,
    margin,
    borderWidth,
    borderColor,
    borderRadius,
    alignment,
  ]);

  return (
    <div className="flex flex-col m-10 gap-y-5">
      {/* TEXT */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="text-button" className="text-xl text-white">
          Text
        </label>
        <input
          id="text-button"
          name="text-button"
          type="text"
          onChange={(e) => setTextButton(e.target.value)}
          value={textButton}
        />
      </div>
      {/* BACKGROUND COLOR */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="bg-color" className="text-xl text-white">
          Background color
        </label>
        <input
          type="color"
          id="bg-color"
          name="bg-color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
      </div>

      {/* FONT SIZE */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="font-size" className="text-xl text-white">
          Font size
        </label>
        <input
          type="range"
          id="font-size"
          name="font-size"
          min="10"
          max="100"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        />
      </div>

      {/* FONT COLOR */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="font-color" className="text-xl text-white">
          Font color
        </label>
        <input
          type="color"
          id="font-color"
          name="font-color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
      </div>

      {/* FONT WEIGHT */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="font-weight" className="text-xl text-white">
          Font weight
        </label>
        <input
          type="range"
          id="font-weight"
          name="font-weight"
          min="100"
          max="900"
          step="100"
          value={fontWeight}
          onChange={(e) => setFontWeight(e.target.value)}
        />
      </div>

      {/* PADDING */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="padding" className="text-xl text-white">
          Padding
        </label>
        <input
          type="range"
          id="padding"
          name="padding"
          min="0"
          max="100"
          value={padding}
          onChange={(e) => setPadding(e.target.value)}
        />
      </div>

      {/* MARGIN */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="margin" className="text-xl text-white">
          Margin
        </label>
        <input
          type="range"
          id="margin"
          name="margin"
          min="0"
          max="100"
          value={margin}
          onChange={(e) => setMargin(e.target.value)}
        />
      </div>

      {/* BORDER WIDTH */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="border-width" className="text-xl text-white">
          Border width
        </label>
        <input
          type="range"
          id="border-width"
          name="border-width"
          min="0"
          max="20"
          value={borderWidth}
          onChange={(e) => setBorderWidth(e.target.value)}
        />
      </div>

      {/* BORDER COLOR */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="border-color" className="text-xl text-white">
          Border color
        </label>
        <input
          type="color"
          id="border-color"
          name="border-color"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
        />
      </div>

      {/* BORDER RADIUS */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="border-radius" className="text-xl text-white">
          Border radius
        </label>
        <input
          type="range"
          id="border-radius"
          name="border-radius"
          min="0"
          max="20"
          value={borderRadius}
          onChange={(e) => setBorderRadius(e.target.value)}
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

export default ButtonEditor;
