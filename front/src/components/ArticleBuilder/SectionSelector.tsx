import { useMemo, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import SectionStructureSelector from './SectionStructureSelector';
import idGenerator from '../../utils/idGenerator';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useNewArticleBuilder } from '../../contexts/NewArticleBuilderContext';

export const CREATE_ARTICLE = gql`
  mutation Mutation(
    $label: String!
    $content: String!
    $isPublished: Boolean!
    $blogId: Float!
    $publishedAt: DateTime
  ) {
    createArticle(
      label: $label
      content: $content
      isPublished: $isPublished
      blogId: $blogId
      publishedAt: $publishedAt
    ) {
      id
      label
      createdAt
      updatedAt
      publishedAt
      content
      isPublished
    }
  }
`;

const REFETCH_ARTICLES = gql`
  query Query($email: String!) {
    getOneUser(email: $email) {
      blog {
        articles {
          id
          label
          createdAt
          updatedAt
          publishedAt
          content
          isPublished
        }
      }
    }
  }
`;

const SectionSelector = () => {
  const { user, setLocalUser } = useUser();
  const { handleSelectSectionStructure, page } = useNewArticleBuilder();

  const [createArticle] = useMutation(CREATE_ARTICLE);
  const [isAddingSection, setIsAddingSection] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [refetchArticles] = useLazyQuery(REFETCH_ARTICLES);
  const navigate = useNavigate();

  const sectionStructureSelectors = useMemo(() => {
    const items = new Array(4).fill(0);
    const _items = items.map((e, i) => (
      <div key={idGenerator()} onClick={() => handleSelectSectionStructure(i + 1)}>
        <SectionStructureSelector nbSeparator={i} />
      </div>
    ));
    return _items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegister = async () => {
    const _cellsContainerId = page.map(
      (sectionContainer) => sectionContainer.section.cellsContainer.id,
    );

    const htmlString = _cellsContainerId
      .map((id) => {
        return document.getElementById(id)?.innerHTML;
      })
      .reduce((acc, value) => {
        if (acc && value) {
          return acc + value + ' ';
        }
        return '';
      })
      ?.toString();

    // console.log({
    //   label: 'Article from blog n°' + user.blogId,
    //   content: htmlString,
    //   isPublished: true,
    //   blogId: user.blogId,
    //   publishedAt: new Date().toString(),
    // });

    await createArticle({
      variables: {
        label: 'Article from blog n°' + user.blogId,
        content: htmlString,
        isPublished: true,
        blogId: user.blogId,
        publishedAt: new Date().toString(),
      },
      onCompleted(data) {
        setLocalUser((state) => ({ ...state, articles: [...state.articles, data.createArticle] }));
      },
    });

    // navigate('/userzzz');
  };

  return (
    <>
      <div className="flex items-center justify-center p-10 mt-10 border-2 border-gray-400 border-dashed">
        {!isAddingSection ? (
          <AiFillPlusCircle
            className="w-12 h-12 cursor-pointer text-yeahbuddy"
            onClick={() => setIsAddingSection(true)}
          />
        ) : (
          <div className="flex-col w-full fles">
            <div className="text-center">
              <p>Veuillez sélectionner une structure</p>
            </div>
            <div className="flex items-center justify-center my-6 gap-x-5">
              {sectionStructureSelectors}
            </div>
            <div className="flex justify-center gap-x-10">
              <button
                className="p-3 text-white bg-red-500 rounded cursor-pointer hover:bg-red-600"
                onClick={() => setIsAddingSection(false)}
              >
                Annuler
              </button>
              <button
                onClick={() => handleRegister()}
                className="p-3 text-white bg-green-600 rounded cursor-pointer hover:bg-green-700"
              >
                Enregistrer
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SectionSelector;
