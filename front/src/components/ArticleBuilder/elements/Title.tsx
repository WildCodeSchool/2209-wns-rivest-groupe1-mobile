import { useMemo } from 'react';

export type levels = 1 | 2 | 3 | 4 | 5 | 6;

interface ITitle {
  dataType: 'title';
  level: levels;
  text: string;
  backgroundColor: string;
  fontSize: string;
  fontColor: string;
  fontWeight: string;
  padding: string;
  margin: string;
  borderWidth: string;
  borderColor: string;
  borderRadius: string;
  alignment: 'start' | 'center' | 'end';
}

const Title = ({
  level,
  text,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  fontColor,
  fontSize,
  fontWeight,
  margin,
  padding,
  alignment,
}: ITitle) => {
  const title = useMemo(() => {
    const componentStyle = {
      backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      color: fontColor,
      fontSize,
      fontWeight,
      margin,
      padding,
    };

    switch (level) {
      case 1:
        return <h1 style={componentStyle}>{text}</h1>;
      case 2:
        return <h2 style={componentStyle}>{text}</h2>;
      case 3:
        return <h3 style={componentStyle}>{text}</h3>;
      case 4:
        return <h4 style={componentStyle}>{text}</h4>;
      case 5:
        return <h5 style={componentStyle}>{text}</h5>;
      case 6:
        return <h6 style={componentStyle}>{text}</h6>;
      default:
        break;
    }
  }, [
    level,
    text,
    backgroundColor,
    borderColor,
    borderRadius,
    borderWidth,
    fontColor,
    fontSize,
    fontWeight,
    margin,
    padding,
  ]);

  return (
    <div
      draggable="true"
      onDragStart={(event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text', event.currentTarget.id);
      }}
      style={{ display: 'flex', justifyContent: alignment }}
    >
      {title}
    </div>
  );
};

export default Title;
