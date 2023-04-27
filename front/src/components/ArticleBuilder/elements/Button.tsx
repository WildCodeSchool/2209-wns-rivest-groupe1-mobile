interface IButton {
  dataType: 'button';
  title?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontColor?: string;
  fontWeight?: string;
  padding?: string;
  margin?: string;
  borderWidth?: string;
  borderColor?: string;
  borderRadius?: string;
}

const Button = ({
  title,
  backgroundColor = '#cc987a',
  fontSize = '20px',
  fontColor = '#ffffff',
  fontWeight = '100',
  padding = '10px',
  margin = '0px',
  borderWidth = '0px',
  borderColor = 'none',
  borderRadius = '0px',
}: IButton) => {
  return (
    <div
      id="b1"
      draggable="true"
      onDragStart={(event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text', event.currentTarget.id);
        event.dataTransfer.effectAllowed = 'copyMove';
      }}
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
