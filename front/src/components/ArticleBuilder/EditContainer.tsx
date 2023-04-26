import { useMemo } from 'react';
import { ArticleBuilderContext } from '../../contexts/ArticleBuilderContext';

interface IEditContainer {
  selectedElement: ArticleBuilderContext['selectedElement'];
}

export const EditContainer = ({ selectedElement }: IEditContainer) => {
  const editTools = useMemo(() => {
    switch (selectedElement.cell.props['data-type']) {
      case 'button':
        return <div>button</div>;
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
  }, [selectedElement.id]);

  return (
    <div className="overflow-y-scroll shadow-inner h-[35vh] bg-black/30">
      <pre>{editTools}</pre>
    </div>
  );
};
