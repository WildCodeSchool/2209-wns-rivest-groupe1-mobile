import { AiFillCloseCircle } from 'react-icons/ai';

const Section = ({
  children,
  id,
  handleDeleteSection,
}: {
  children: JSX.Element;
  id: string;
  handleDeleteSection: (id: string) => void;
}) => {
  return (
    <div key={id} className="relative my-5">
      <AiFillCloseCircle
        className="absolute cursor-pointer h-4 w-4 -right-1.5 -top-1.5 text-red-600 bg-white"
        onClick={() => handleDeleteSection(id)}
      />
      {children}
    </div>
  );
};

export default Section;
