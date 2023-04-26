import React, { useEffect, useState } from 'react';

export interface ArticleBuilderContext {
  selectedElement: any;
  setSelectedElement: React.Dispatch<any>;
}

const articleBuilderContext = React.createContext({} as ArticleBuilderContext);

export function ArticleBuilderProvider({ children }: { children: React.ReactNode }) {
  const [selectedElement, setSelectedElement] = useState<null | any>({ id: '', cell: null });

  useEffect(() => {
    console.log(selectedElement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedElement.id]);

  return (
    <articleBuilderContext.Provider
      value={{
        selectedElement,
        setSelectedElement,
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
