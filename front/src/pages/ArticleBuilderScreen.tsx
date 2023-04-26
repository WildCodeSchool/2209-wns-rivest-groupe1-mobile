import ArticleBuilder from '../components/ArticleBuilder/ArticleBuilder';
import { ArticleBuilderProvider } from '../contexts/ArticleBuilderContext';

const ArticleBuilderScreen = () => {
  return (
    <ArticleBuilderProvider>
      <ArticleBuilder />
    </ArticleBuilderProvider>
  );
};

export default ArticleBuilderScreen;
