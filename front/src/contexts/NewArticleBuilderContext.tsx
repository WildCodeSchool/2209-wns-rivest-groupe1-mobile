import React, { useState } from 'react';
import idGenerator from '../utils/idGenerator';
import CellPlaceholder from '../components/ArticleBuilder/CellPlaceholder';

export const newArticleBuilderContext = React.createContext({} as INewArticleBuilderProvider);

export interface ICurrentEditingElement {
  sectionId: string | null;
  cellId: string | null;
  element: JSX.Element | null;
}

export function NewArticleBuilderProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<ISectionContainer[]>([]);
  const [currentEditingElement, setCurrentEditingElement] = useState<ICurrentEditingElement>({
    sectionId: '',
    cellId: '',
    element: null,
  });

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    cellsContainerId: string,
    setDraggingOverCellId: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingOverCellId(cellsContainerId);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleElement = (sectionId: string, cellId: string, element: JSX.Element) => {
    const updatedCells = page
      // Je récupère la section qui contient la cellule a changer
      .filter((sectionContainer) => sectionContainer.section.id === sectionId)[0]
      // Je remplace l'élément dans ICell[] et je renvoi le ICell[] modifié
      .section.cellsContainer.cells.map((cell) => {
        if (cell.id === cellId) {
          cell.element = element;
        }
        return cell;
      });

    const _page = page.map((sectionContainer) => {
      // Je remplace le ICell[] avec les nouvelles
      if (sectionContainer.section.id === sectionId) {
        return {
          section: {
            id: sectionContainer.section.id,
            cellsContainer: {
              id: sectionContainer.section.cellsContainer.id,
              cells: updatedCells,
            },
          },
        };
        // Sinon je renvoi la section non touchée
      } else {
        return sectionContainer;
      }
    });

    return setPage(_page);
  };

  const handleSelectSectionStructure = (nbCells: number) => {
    const _sectionId = idGenerator();
    const _cellsContainerId = idGenerator();

    return setPage((state) => {
      return [
        ...state,
        {
          section: {
            id: _sectionId,
            cellsContainer: {
              id: _cellsContainerId,
              cells: new Array(nbCells).fill(0).map((e) => ({
                id: idGenerator(),
                element: <CellPlaceholder id={idGenerator()} />,
              })),
            },
          },
        },
      ];
    });
  };

  const handleDeleteSection = (sectionId: string) => {
    const _sections = [...page].filter(
      (sectionContainer) => sectionContainer.section.id !== sectionId,
    );
    setPage(_sections);
  };

  return (
    <newArticleBuilderContext.Provider
      value={{
        page,
        handleSelectSectionStructure,
        handleDeleteSection,
        handleElement,
        handleDragOver,
        currentEditingElement,
        setCurrentEditingElement,
      }}
    >
      {children}
    </newArticleBuilderContext.Provider>
  );
}

export function useNewArticleBuilder() {
  const newArticleBuilder = React.useContext(newArticleBuilderContext);
  return newArticleBuilder;
}

export default newArticleBuilderContext;

export interface INewArticleBuilderProvider {
  page: ISectionContainer[];
  handleSelectSectionStructure: (nbCells: number) => void;
  handleDeleteSection: (sectionId: string) => void;
  handleElement: (sectionId: string, cellId: string, element: JSX.Element) => void;
  handleDragOver: (
    e: React.DragEvent<HTMLDivElement>,
    cellsContainerId: string,
    setDraggingOverCellId: React.Dispatch<React.SetStateAction<string>>,
  ) => void;
  currentEditingElement: ICurrentEditingElement;
  setCurrentEditingElement: React.Dispatch<React.SetStateAction<ICurrentEditingElement>>;
}

export interface ISectionContainer {
  section: ISection;
}

export interface ISection {
  id: string;
  cellsContainer: ICellsContainer;
}

export interface ICellsContainer {
  id: string;
  cells: ICell[];
}

export interface ICell {
  id: string;
  element: JSX.Element;
}

// const truc: ISectionContainer[] = [
//   {
//     section: {
//       id: '123',
//       cellsContainer: {
//         id: 'qwe',
//         cells: [
//           { id: '543', element: <div></div> },
//           { id: '543', element: <div></div> },
//         ],
//       },
//     },
//   },
//   {
//     section: {
//       id: '123',
//       cellsContainer: {
//         id: 'qwe',
//         cells: [
//           { id: '543', element: <div></div> },
//           { id: '543', element: <div></div> },
//         ],
//       },
//     },
//   },
//   {
//     section: {
//       id: '123',
//       cellsContainer: {
//         id: 'qwe',
//         cells: [
//           { id: '543', element: <div></div> },
//           { id: '543', element: <div></div> },
//         ],
//       },
//     },
//   },
// ];

// const func = () => {
//     return (
//         <SectionsRenderer>
//             <Section id={sectionId} key={sectionId}>
//                 <CellsContainer id={cellsContainerId} key={cellsContainerId}>
//                     <Cell id={cellId} key={cellId} />
//                 </CellsContainer>
//             </Section>

//             <Section id={sectionId} key={sectionId}>
//                 <CellsContainer id={cellsContainerId} key={cellsContainerId}>
//                     <Cell id={cellId} key={cellId} />
//                     <Cell id={cellId} key={cellId} />
//                     <Cell id={cellId} key={cellId} />
//                 </CellsContainer>
//             </Section>

//             <Section id={sectionId} key={sectionId}>
//                 <CellsContainer id={cellsContainerId} key={cellsContainerId}>
//                     <Cell id={cellId} key={cellId} />
//                 </CellsContainer>
//             </Section>

//             <Section id={sectionId} key={sectionId}>
//                 <CellsContainer id={cellsContainerId} key={cellsContainerId}>
//                     <Cell id={cellId} key={cellId} />
//                     <Cell id={cellId} key={cellId} />
//                     <Cell id={cellId} key={cellId} />
//                     <Cell id={cellId} key={cellId} />
//                 </CellsContainer>
//             </Section>
//         </SectionsRenderer>
//     )
// }
