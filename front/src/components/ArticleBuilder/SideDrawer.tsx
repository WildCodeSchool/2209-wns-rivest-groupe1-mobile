import { useState } from 'react';
import { getToolIconProperties } from '../../utils/ToolIconProperties';
import { Label } from '../Label';
import { SelectedTool, SimpleToolPicker } from '../SimpleToolPicker';
import { EditContainer } from './EditContainer';
import { useArticleBuilder } from '../../contexts/ArticleBuilderContext';
interface SideDrawerProps {
  showControls?: boolean;
  onToolSelected: (tool: any) => void;
}
const SideDrawer = (props: SideDrawerProps) => {
  const [selectedTool, setSelectedTool] = useState<SelectedTool>(SelectedTool.LABEL);
  const [elementType, setElementType] = useState<string>('');
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', elementType);
  };
  const { selectedElement } = useArticleBuilder();
  return (
    <aside className="sticky w-1/4 bg-mediumweight">
      <Label className="p-2 text-xl font-semibold text-center text-white">ÉLÉMENTS</Label>
      <SimpleToolPicker
        availableTools={Array.from(Object.values(SelectedTool)) as SelectedTool[]}
        selectedTool={getToolIconProperties(selectedTool)}
        onToolSelected={(tool: SelectedTool) => {
          setSelectedTool(tool);
          setElementType(getToolIconProperties(tool).type);
          props.onToolSelected(tool);
        }}
        onDragStart={onDragStart}
      />
      <Label className="p-2 text-xl font-semibold text-center text-white">ÉDIT</Label>
      <EditContainer selectedElement={selectedElement} />
    </aside>
  );
};

export default SideDrawer;
