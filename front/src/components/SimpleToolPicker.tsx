import { useState } from 'react';
import { getToolIconProperties } from '../utils/ToolIconProperties';
import { BaseIcon, NORMAL_ICON_SIZE } from './BaseIcon';
import { ToolButton } from './ToolButton';

export enum SelectedTool {
  // NONE = 'NONE',
  TITLE = 'TITLE',
  SEPARATOR = 'SEPARATOR',
  PARAGRAPH = 'PARAGRAPH',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  BUTTON = 'BUTTON',
  ICON = 'ICON',
  TEXT = 'TEXT',
  SECTION = 'SECTION',
  // EDIT = 'EDIT',
  // DELETE = 'DELETE',
  // DELETE_ALL = 'DELETE_ALL',
  // BACKGROUND_COLOR = 'BACKGROUND_COLOR',
}

interface SimpleToolPickerProps {
  availableTools: SelectedTool[];
  selectedTool: any;
  onToolSelected: (tool: any) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  tooltip?: boolean;
  contextualMenu?: boolean;
  children?: any;
  maxWidth?: number;
  style?: any;
}

export const SimpleToolPicker = (props: SimpleToolPickerProps) => {
  const [cursor, setCursor] = useState<string>('pointer');

  return (
    <div
      className="container overflow-y-scroll shadow-inner h-[35vh] bg-black/30"
      style={{
        maxWidth: props.maxWidth,
        position: 'relative',
        padding: 20,
        gap: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {props.availableTools.map((t: any, i) => {
        const toolItemProperties = getToolIconProperties(t);

        return (
          <ToolButton
            key={'edit' + i}
            className="p-2 rounded shadow-md bg-yeahbuddy text-lightweight "
            style={{ cursor: cursor }}
            icon={
              <BaseIcon
                iconName={toolItemProperties.name}
                size={NORMAL_ICON_SIZE * 1.5}
                color={'white'}
              />
            }
            title={toolItemProperties.title}
            onClick={() => {
              props.onToolSelected(t);
              setCursor('grab');
            }}
            onDragStart={props.onDragStart}
          />
        );
      })}

      {props.children}
    </div>
  );
};
