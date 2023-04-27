import Button from '../components/ArticleBuilder/elements/Button';
import Icon from '../components/ArticleBuilder/elements/Icon';
import Image from '../components/ArticleBuilder/elements/Image';
import Title from '../components/ArticleBuilder/elements/Title';
import { SelectedTool } from '../components/SimpleToolPicker';
import * as icons from 'react-bootstrap-icons';

export interface ToolIconProperties {
  name: keyof typeof icons;
  title: string;
  style?: string;
  content: JSX.Element;
  type: string;
  cursor?: string;
  position?: number[];
}
export const getToolIconProperties = (tool: string): ToolIconProperties => {
  switch (tool) {
    case SelectedTool.BUTTON:
      return {
        name: 'PlusSquareFill',
        title: 'Bouton',
        type: 'button',
        content: <Button dataType="button" />,
      };
    case SelectedTool.ICON:
      return {
        name: 'EmojiSmileFill',
        title: 'Icone',
        type: 'icon',
        content: <Icon dataType="icon" />,
      };
    case SelectedTool.IMAGE:
      return {
        name: 'Image',
        title: 'Image',
        type: 'image',
        content: <Image dataType="img" />,
      };
    case SelectedTool.TITLE:
      return {
        name: 'Bookmark',
        title: 'Titre',
        type: 'title',
        content: <Title dataType="title" />,
      };
    case SelectedTool.PARAGRAPH:
      return {
        name: 'TextParagraph',
        title: 'Paragraphe',
        type: 'paragraph',
        content: (
          <p data-type="paragraph">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore ab voluptatibus
            aliquid distinctio tempora voluptates consequatur, ratione aut similique, blanditiis
            numquam doloribus, culpa voluptate eos. Aperiam ipsum sint qui earum! Assumenda
          </p>
        ),
        cursor: 'crosshair',
        // style: 'eraserIcon',
        // position: [0, 16],
      };
    // case SelectedTool.EDIT:
    //   return {
    //     name: 'ArrowsMove',
    //     title: 'Sélectionner / déplacer',
    //     type: 'edit',

    //     cursor: 'move',
    //     style: 'edit',
    //     position: [12, 12],
    //   };
    case SelectedTool.SEPARATOR:
      return {
        name: 'ArrowsCollapse',
        title: 'Séparateur',
        content: <div data-type="separator">________________________________</div>,
        type: 'separator',
        style: 'circle',
        position: [12, 12],
      };
    case SelectedTool.VIDEO:
      return {
        name: 'Youtube',
        title: 'Vidéo',
        content: (
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            data-type="video"
          ></iframe>
        ),
        type: 'video',
        // style: 'dash',
        // position: [0, 16],
      };
    case SelectedTool.SECTION:
      return {
        name: 'CardText',
        title: 'Section',
        content: (
          <div data-type="section">
            UNE SECTION INTERNE QUI EST À L'INTÉRIEUR DE LA CAROTTE SOUS LE FRIGO
          </div>
        ),
        type: 'section',
        style: 'square',
      };
    case SelectedTool.TEXT:
      return {
        name: 'Fonts',
        title: 'Texte',
        content: <div data-type="text">UN TEXTE</div>,
        type: 'text',
        // style: 'fonts',
        // position: [16, 16],
      };

    // case SelectedTool.DELETE_ALL:
    //   return {
    //     name: 'Trash',
    //     title: 'Tout effacer',
    //     type: 'edit',
    //     cursor: 'move',
    //     style: 'trash',
    //     position: [0, 0],
    //   };
    // case SelectedTool.NONE:
    //   return {
    //     name: 'XCircle',
    //     title: 'Aucun',
    //     cursor: 'no-drop',
    //     style: 'none',
    //   };
    // case SelectedTool.BACKGROUND_COLOR:
    //   return {
    //     name: 'PaletteFill',
    //     title: 'Couleur de fond',
    //     type: 'edit',
    //     cursor: 'no-drop',
    //     style: 'none',
    //   };

    default:
      return { name: 'DashCircle', title: '', type: '', style: '', content: <div>R</div> };
  }
};
