import { AiOutlinePlus } from 'react-icons/ai';

const CellPlaceholder = ({ id }: { id: string }) => {
  return (
    <div
      id={id}
      className="flex items-center justify-center w-full border border-dashed h-7 border-neutral-400"
    >
      <AiOutlinePlus className="rounded-full text-neutral-400" />
    </div>
  );
};

export default CellPlaceholder;
