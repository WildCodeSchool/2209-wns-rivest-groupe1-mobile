// A VIRER
const DragableItem = ({ id }: { id: string }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', 'draggableItem');
  };

  return (
    <div
      id={id.toString() + 'caca'}
      draggable
      onDragStart={(e) => handleDragStart(e)}
      className="w-40 h-40 mr-2 bg-gray-700"
    ></div>
  );
};

export default DragableItem;
