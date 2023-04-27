import { useMemo } from 'react';
import {
  AiFillCheckCircle,
  AiFillCheckSquare,
  AiFillCloseCircle,
  AiFillCloseSquare,
  AiFillControl,
  AiFillDislike,
  AiFillFastBackward,
  AiFillFastForward,
  AiFillFire,
  AiFillHeart,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillGithub,
} from 'react-icons/ai';

type iconName =
  | 'CheckCircle'
  | 'CheckSquare'
  | 'CloseCircle'
  | 'CloseSquare'
  | 'Control'
  | 'Dislike'
  | 'FastBackward'
  | 'FastForward'
  | 'Fire'
  | 'Heart'
  | 'Instagram'
  | 'Linkedin'
  | 'Github';

interface IIcon {
  dataType: 'icon';
  icon?: iconName;
  color?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
}

const Icon = ({ icon = 'CheckCircle', color, width, height, backgroundColor }: IIcon) => {
  const iconComponent = useMemo(() => {
    const componentStyle = { color, width, height, backgroundColor };

    switch (icon) {
      case 'CheckCircle':
        return <AiFillCheckCircle style={componentStyle} />;
      case 'CheckSquare':
        return <AiFillCheckSquare style={componentStyle} />;
      case 'CloseCircle':
        return <AiFillCloseCircle style={componentStyle} />;
      case 'CloseSquare':
        return <AiFillCloseSquare style={componentStyle} />;
      case 'Control':
        return <AiFillControl style={componentStyle} />;
      case 'Dislike':
        return <AiFillDislike style={componentStyle} />;
      case 'FastBackward':
        return <AiFillFastBackward style={componentStyle} />;
      case 'FastForward':
        return <AiFillFastForward style={componentStyle} />;
      case 'Fire':
        return <AiFillFire style={componentStyle} />;
      case 'Heart':
        return <AiFillHeart style={componentStyle} />;
      case 'Instagram':
        return <AiFillInstagram style={componentStyle} />;
      case 'Linkedin':
        return <AiFillLinkedin style={componentStyle} />;
      case 'Github':
        return <AiFillGithub style={componentStyle} />;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [icon, color, width, height, backgroundColor]);

  return <>{iconComponent}</>;
};

export default Icon;

// type colors =
//   | 'slate'
//   | 'zinc'
//   | 'stone'
//   | 'red'
//   | 'orange'
//   | 'yellow'
//   | 'lime'
//   | 'green'
//   | 'cyan'
//   | 'violet'
//   | 'fushcia'
//   | 'pink'
//   | 'rose'
//   | 'yeahbuddy';

// type colorIntensity = '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

// export type widthOrHeight =
//   | 1
//   | 2
//   | 3
//   | 4
//   | 5
//   | 6
//   | 7
//   | 8
//   | 9
//   | 10
//   | 11
//   | 12
//   | 14
//   | 16
//   | 20
//   | 24
//   | 28
//   | 32
//   | 36
//   | 40
//   | 44
//   | 48
//   | 52
//   | 56
//   | 60
//   | 64
//   | 72
//   | 80
//   | 96;
