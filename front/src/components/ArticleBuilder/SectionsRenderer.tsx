import { useState } from 'react';
import { useNewArticleBuilder } from '../../contexts/NewArticleBuilderContext';
import { getToolIconProperties } from '../../utils/ToolIconProperties';
import CellsContainer from './CellsContainer';
import Section from './Section';

const SectionsRenderer = () => {
  const [draggingOverCellId, setDraggingOverCellId] = useState('');

  const { page, handleDeleteSection, handleElement, handleDragOver, setCurrentEditingElement } =
    useNewArticleBuilder();

  return (
    <>
      {page.map((sectionContainer) => (
        <Section
          key={sectionContainer.section.id}
          id={sectionContainer.section.id}
          handleDeleteSection={handleDeleteSection}
        >
          <CellsContainer id={sectionContainer.section.cellsContainer.id}>
            {sectionContainer.section.cellsContainer.cells.map((cell) => (
              <div
                key={cell.id}
                className={`w-full cursor-pointer ${
                  draggingOverCellId === cell.id ? 'bg-yeahbuddy/50' : ''
                }`}
                onDrop={(e) => {
                  handleElement(
                    sectionContainer.section.id,
                    cell.id,
                    getToolIconProperties(e.dataTransfer.getData('text').toUpperCase()).content,
                  );
                  setDraggingOverCellId('');
                }}
                onDragOver={(e) => handleDragOver(e, cell.id, setDraggingOverCellId)}
                onDragLeave={() => setDraggingOverCellId('')}
                onClick={() => {
                  setCurrentEditingElement({
                    sectionId: sectionContainer.section.id,
                    cellId: cell.id,
                    element: cell.element,
                  });
                }}
              >
                {cell.element}
              </div>
            ))}
          </CellsContainer>
        </Section>
      ))}
    </>
  );
};

export default SectionsRenderer;
