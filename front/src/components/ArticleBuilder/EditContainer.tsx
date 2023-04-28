import { useMemo } from 'react';
import ButtonEditor from './editorTools/ButtonEditor';
import IconEditor from './editorTools/IconEditor';
import {
  ICurrentEditingElement,
  useNewArticleBuilder,
} from '../../contexts/NewArticleBuilderContext';
import ImageEditor from './editorTools/ImageEditor';
import TitleEditor from './editorTools/TitleEditor';
import ParagraphEditor from './editorTools/ParagraphEditor';

interface IEditContainer {
  currentEditingElement: ICurrentEditingElement;
}

export const EditContainer = ({ currentEditingElement }: IEditContainer) => {
  const { currentEditingElement: current } = useNewArticleBuilder();

  const editTools = useMemo(() => {
    switch (currentEditingElement.element?.props.dataType) {
      case 'button':
        return <ButtonEditor />;
      case 'icon':
        return <IconEditor />;
      case 'img':
        return <ImageEditor />;
      case 'title':
        return <TitleEditor />;
      case 'paragraph':
        return <ParagraphEditor />;
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
  }, [currentEditingElement.cellId, current.cellId]);

  return <div className="overflow-y-scroll shadow-inner h-[35vh] bg-black/30">{editTools}</div>;
};
