interface IParagraph {
  dataType: 'paragraph';
  text: string;
  color: string;
  alignment: 'left' | 'center' | 'right' | 'justify';
}

const Paragraph = ({ text, color, alignment }: IParagraph) => {
  return <p style={{ color, textAlign: alignment }}>{text}</p>;
};

export default Paragraph;
