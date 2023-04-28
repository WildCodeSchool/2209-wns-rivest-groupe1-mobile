import { useEffect, useMemo, useState } from 'react';
import { useNewArticleBuilder } from '../../../contexts/NewArticleBuilderContext';
import Icon, { iconName } from '../elements/Icon';
import { AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight } from 'react-icons/ai';

const IconEditor = () => {
  const { handleElement, currentEditingElement, setCurrentEditingElement } = useNewArticleBuilder();

  const [icon, setIcon] = useState<iconName>(currentEditingElement.element?.props.icon);
  const [color, setColor] = useState<string>(currentEditingElement.element?.props.color);
  const [size, setSize] = useState<string>(currentEditingElement.element?.props.size);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    currentEditingElement.element?.props.backgroundColor,
  );
  const [alignment, setAlignment] = useState<'start' | 'center' | 'end'>(
    currentEditingElement.element?.props.alignment,
  );

  useEffect(() => {
    setIcon(currentEditingElement.element?.props.icon);
    setColor(currentEditingElement.element?.props.color);
    setSize(currentEditingElement.element?.props.size);
    setBackgroundColor(currentEditingElement.element?.props.backgroundColor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEditingElement.cellId]);

  useEffect(() => {
    setCurrentEditingElement({
      sectionId: currentEditingElement.sectionId as string,
      cellId: currentEditingElement.cellId as string,
      element: (
        <Icon
          dataType="icon"
          icon={icon}
          color={color}
          size={`${size}px`}
          backgroundColor={backgroundColor}
          alignment={alignment}
        />
      ),
    });
    handleElement(
      currentEditingElement.sectionId as string,
      currentEditingElement.cellId as string,
      <Icon
        dataType="icon"
        icon={icon}
        color={color}
        size={size}
        backgroundColor={backgroundColor}
        alignment={alignment}
      />,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icon, color, size, backgroundColor, alignment]);

  const icons = useMemo(() => {
    return [
      'CheckCircle',
      'CheckSquare',
      'CloseCircle',
      'CloseSquare',
      'Control',
      'Dislike',
      'FastBackward',
      'FastForward',
      'Fire',
      'Heart',
      'Instagram',
      'Linkedin',
      'Github',
      'Smile',
    ];
  }, []);

  return (
    <div className="flex flex-col m-10 gap-y-5">
      {/* ICON */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="icon" className="text-xl text-white">
          Icon
        </label>
        <select name="icon" id="icon" onChange={(e) => setIcon(e.target.value as iconName)}>
          {icons.map((iconName) => (
            <option value={iconName}>{iconName}</option>
          ))}
        </select>
      </div>

      {/* COLOR */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="color" className="text-xl text-white">
          Color
        </label>
        <input
          type="color"
          id="color"
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      {/* SIZE */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="size" className="text-xl text-white">
          Size
        </label>
        <input
          type="range"
          id="size"
          name="size"
          min="10"
          max="100"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>

      {/* BACKGROUND COLOR */}
      <div className="flex flex-col p-3 border border-white rounded shadow-md">
        <label htmlFor="background-color" className="text-xl text-white">
          Background color
        </label>
        <input
          type="color"
          id="background-color"
          name="background-color"
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
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

export default IconEditor;
