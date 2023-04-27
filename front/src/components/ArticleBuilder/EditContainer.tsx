import { useMemo } from 'react';
import ButtonEditor from './editorTools/ButtonEditor';
import { ICurrentEditingElement } from '../../contexts/NewArticleBuilderContext';

interface IEditContainer {
  currentEditingElement: ICurrentEditingElement;
}

export const EditContainer = ({ currentEditingElement }: IEditContainer) => {
  const editTools = useMemo(() => {
    switch (currentEditingElement.element?.props.dataType) {
      case 'button':
        return <ButtonEditor />;
      case 'icon':
        return <div>icon</div>;
      case 'img':
        return <div>img</div>;
      case 'title':
        return <div>title</div>;
      case 'paragraph':
        return <div>paragraph</div>;
      case 'separator':
        return <div>separator</div>;
      case 'video':
        return <div>video</div>;
      case 'section':
        return <div>section</div>;
      case 'text':
        return <div>text</div>;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEditingElement.cellId]);

  return <div className="overflow-y-scroll shadow-inner h-[35vh] bg-black/30">{editTools}</div>;
};
