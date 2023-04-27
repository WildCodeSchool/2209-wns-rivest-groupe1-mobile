import React, { useEffect, useState } from 'react';
import idGenerator from '../utils/idGenerator';
import Section from '../components/ArticleBuilder/Section';
import { Cell } from '../components/ArticleBuilder/CellsContainer';

const articleBuilderContext = React.createContext({} as ArticleBuilderContext);

export function ArticleBuilderProvider({ children }: { children: React.ReactNode }) {
  const [selectedElement, setSelectedElement] = useState<null | any>({ id: '', cell: null });
  const [modifyingElement, setModifyingElement] = useState<any>(null);
  const [selectedSections, setSelectedSection] = useState<ISection[]>([]);
  const [cellsContainerIds, setCellsContainerIds] = useState<string[]>([]);
  // const [isEditingElement, setIsEditingElement] = useState(false);

  const [bnf, setBnf] = useState<boolean>(false);

  const handleDeleteCellsContainerId = (id: string) =>
    setCellsContainerIds((state) => state.filter((cellsContainerId) => cellsContainerId !== id));

  const handleDeleteSection = (id: string, cellsContainerId: string) => {
    handleDeleteCellsContainerId(cellsContainerId);
    setSelectedSection((state) => state.filter((section) => section.id !== id));
  };

  const handleSelectSectionStructure = (nb: number) => {
    const _id = idGenerator();
    const _cellsContainerId = idGenerator();
    setCellsContainerIds((state) => [...state, _cellsContainerId]);
    setSelectedSection((state) => {
      return [
        ...state,
        {
          id: _id,
          elem: (
            <Section
              nb={nb}
              id={_id}
              key={_id}
              handleDeleteSection={handleDeleteSection}
              cellsContainerId={_cellsContainerId}
            />
          ),
        },
      ];
    });
  };

  const replaceCellByElement = (
    cellId: string,
    cells: ICell[],
    element: JSX.Element,
    setCells: React.Dispatch<React.SetStateAction<ICell[]>>,
  ) => {
    const _cells = cells.map((e) => {
      if (e.id === cellId) {
        e.cell = element;
        return e;
      } else {
        const _id = idGenerator();
        return { id: _id, cell: <Cell id={_id} /> };
      }
    });
    setCells(_cells);
  };

  useEffect(() => {
    console.log(selectedElement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedElement.id]);

  return (
    <articleBuilderContext.Provider
      value={{
        selectedElement,
        setSelectedElement,
        modifyingElement,
        setModifyingElement,
        bnf,
        setBnf,
        selectedSections,
        handleSelectSectionStructure,
        cellsContainerIds,
        replaceCellByElement,
      }}
    >
      {children}
    </articleBuilderContext.Provider>
  );
}

export function useArticleBuilder() {
  const user = React.useContext(articleBuilderContext);
  return user;
}

export default articleBuilderContext;

export interface ArticleBuilderContext {
  selectedElement: any;
  setSelectedElement: React.Dispatch<any>;
  modifyingElement: any;
  setModifyingElement: React.Dispatch<any>;
  bnf: boolean;
  setBnf: React.Dispatch<React.SetStateAction<boolean>>;
  selectedSections: ISection[];
  handleSelectSectionStructure: (nb: number) => void;
  cellsContainerIds: string[];
  replaceCellByElement: (
    cellId: string,
    cells: ICell[],
    element: JSX.Element,
    setCells: React.Dispatch<React.SetStateAction<ICell[]>>,
  ) => void;
}

export interface ICell {
  id: string;
  cell: JSX.Element;
}

export interface ISection {
  id: string;
  elem: JSX.Element;
}
