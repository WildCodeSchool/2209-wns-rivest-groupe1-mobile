const MenuList = ({
  label,
  items,
  isActive,
  isOpen,
  component,
  setIsOpen,
  setComponent,
}: {
  label: string;
  items: any[];
  isActive: boolean;
  isOpen: boolean;
  component: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setComponent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          setComponent(component !== 'Articles' ? 'Articles' : '');
        }}
        className={`h-10 pl-5 flex items-center cursor-pointer hover:bg-yeahbuddy hover:text-white ${
          isActive ? 'bg-yeahbuddy text-white' : ''
        }`}
      >
        <span>{label}</span>
      </div>
      <div className={`relative flex flex-col ${isActive ? 'block' : 'hidden'}`}>
        {items?.map((art) => (
          <div
            className="flex items-center h-7 p-2 ml-8 cursor-pointer hover:bg-neutral-100"
            key={art.id}
          >
            {art.label}
          </div>
        ))}
      </div>
    </>
  );
};

export default MenuList;
