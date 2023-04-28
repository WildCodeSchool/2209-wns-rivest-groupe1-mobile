interface IButton {
  dataType: 'button';
  title: string;
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

const Button = ({
  title,
  backgroundColor,
  fontSize,
  fontColor,
  fontWeight,
  padding,
  margin,
  borderWidth,
  borderColor,
  borderRadius,
  alignment,
}: IButton) => {
  return (
    <div
      id="b1"
      draggable="true"
      onDragStart={(event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text', event.currentTarget.id);
        event.dataTransfer.effectAllowed = 'copyMove';
      }}
      style={{ display: 'flex', justifyContent: alignment }}
    >
      <button
        style={{
          backgroundColor,
          fontSize,
          color: fontColor,
          fontWeight,
          padding,
          margin,
          borderWidth,
          borderColor,
          borderRadius,
        }}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
