import ArticleBuilder from '../components/ArticleBuilder/ArticleBuilder';
import { NewArticleBuilderProvider } from '../contexts/NewArticleBuilderContext';

const ArticleBuilderScreen = () => {
  return (
    <NewArticleBuilderProvider>
      <ArticleBuilder />
    </NewArticleBuilderProvider>
  );
};

export default ArticleBuilderScreen;
