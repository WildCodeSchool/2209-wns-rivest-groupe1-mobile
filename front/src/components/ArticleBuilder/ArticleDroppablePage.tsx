import SectionSelector from './SectionSelector';
import SectionsRenderer from './SectionsRenderer';

const ArticleDroppablePage = () => {
  return (
    <div className="w-full min-h-[80vh] p-16" id="page_content">
      <SectionsRenderer />
      <SectionSelector />
    </div>
  );
};

export default ArticleDroppablePage;
