const CellsContainer = ({ children, id }: { children: JSX.Element[]; id: string }) => {
  return (
    <div className="p-1 border border-black" id={id}>
      <div className="flex justify-between w-full gap-x-5"> {children} </div>
    </div>
  );
};

export default CellsContainer;
