import { useEffect, useState } from 'react';
import Button from '../elements/Button';
import { useNewArticleBuilder } from '../../../contexts/NewArticleBuilderContext';

const ButtonEditor = () => {
  const { handleElement, currentEditingElement } = useNewArticleBuilder();
  const [textButton, setTextButton] = useState('Button');
  const [bgColor, setBgColor] = useState('#cc987a');
  const [fontSize, setFontSize] = useState('20');
  const [fontColor, setFontColor] = useState('#ffffff');
  const [fontWeight, setFontWeight] = useState('100');
  const [padding, setPadding] = useState('10');
  const [margin, setMargin] = useState('0');
  const [borderWidth, setBorderWidth] = useState('0');
  const [borderColor, setBorderColor] = useState('#ffffff');
  const [borderRadius, setBorderRadius] = useState('0');

  useEffect(() => {
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
  ]);

  return (
    <div className="m-3">
      <div>
        <input
          id="text-button"
          name="text-button"
          type="text"
          onChange={(e) => setTextButton(e.target.value)}
          value={textButton}
        />
        <label htmlFor="text-button">{textButton}</label>
      </div>
      {/* BACKGROUND COLOR */}
      <div className="mt-5">
        <input
          type="color"
          id="bg-color"
          name="bg-color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
        <label htmlFor="bg-color" className="ml-5 text-white" style={{ backgroundColor: bgColor }}>
          Background color
        </label>
      </div>

      {/* FONT SIZE */}
      <div className="mt-5">
        <input
          type="range"
          id="font-size"
          name="font-size"
          min="10"
          max="100"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        />
        <label htmlFor="font-size" className="ml-5" style={{ fontSize: `${fontSize}px` }}>
          font size
        </label>
      </div>

      {/* FONT COLOR */}
      <div className="mt-5">
        <input
          type="color"
          id="font-color"
          name="font-color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />
        <label htmlFor="font-color" className="ml-5" style={{ color: fontColor }}>
          font color
        </label>
      </div>

      {/* FONT WEIGHT */}
      <div className="mt-5">
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
        <label htmlFor="font-weight" className="ml-5" style={{ fontWeight }}>
          font weight
        </label>
      </div>

      {/* PADDING */}
      <div className="mt-5">
        <input
          type="range"
          id="padding"
          name="padding"
          min="0"
          max="100"
          value={padding}
          onChange={(e) => setPadding(e.target.value)}
        />
        <label htmlFor="padding" className="ml-5" style={{ padding: `${padding}px` }}>
          padding
        </label>
      </div>

      {/* MARGIN */}
      <div className="mt-5">
        <input
          type="range"
          id="margin"
          name="margin"
          min="0"
          max="100"
          value={margin}
          onChange={(e) => setMargin(e.target.value)}
        />
        <label htmlFor="margin" className="ml-5" style={{ margin: `${margin}px` }}>
          margin
        </label>
      </div>

      {/* BORDER WIDTH */}
      <div className="mt-5">
        <input
          type="range"
          id="border-width"
          name="border-width"
          min="0"
          max="20"
          value={borderWidth}
          onChange={(e) => setBorderWidth(e.target.value)}
        />
        <label htmlFor="border-width" className="ml-5" style={{ borderWidth: `${borderWidth}px` }}>
          border width
        </label>
      </div>

      {/* BORDER COLOR */}
      <div className="mt-5">
        <input
          type="color"
          id="border-color"
          name="border-color"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
        />
        <label
          htmlFor="border-color"
          className="ml-5"
          style={{ borderColor: borderColor, borderWidth: '2px' }}
        >
          border color
        </label>
      </div>

      {/* BORDER RADIUS */}
      <div className="mt-5">
        <input
          type="range"
          id="border-radius"
          name="border-radius"
          min="0"
          max="20"
          value={borderRadius}
          onChange={(e) => setBorderRadius(e.target.value)}
        />
        <label
          htmlFor="border-radius"
          className="ml-5"
          style={{ borderRadius: `${borderRadius}px`, borderWidth: '2px', padding: 10 }}
        >
          border radius
        </label>
      </div>
    </div>
  );
};

export default ButtonEditor;
