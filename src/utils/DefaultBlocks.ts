import { Text } from '@/types/blocks/Text';
import { Heading } from '@/types/blocks/Heading';
import { Image } from '@/types/blocks/Image';
import { Button } from '@/types/blocks/Button';
import { Divider } from '@/types/blocks/Divider';
import { Spacer } from '@/types/blocks/Spacer';
import { HTML } from '@/types/blocks/HTML';
import { Avatar } from '@/types/blocks/Avatar';
import { Column } from '@/types/blocks/Column';
import { Columns } from '@/types/blocks/Columns';
import { Container } from '@/types/blocks/Container';

export const generateBlock = (type: string, parentId: string | null = null, order: number = 0) => {
  const id = crypto.randomUUID();

  switch (type) {
    case 'text':
      return {
        id,
        type: 'text',
        text: 'Your text here',
        order,
        parentId,
        children: [],
        style: {
          textColor: '#000000',
          fontSize: '16px',
          fontWeight: '400',
          align: 'left',
          margin: '10px',
        },
      } as Text;

    case 'heading':
      return {
        id,
        type: 'heading',
        text: 'Heading',
        level: 2,
        order,
        parentId,
        children: [],
        style: {
          textColor: '#000000',
          fontSize: '24px',
          fontWeight: 'bold',
          align: 'left',
        },
      } as Heading;

    case 'image':
      return {
        id,
        type: 'image',
        src: 'https://via.placeholder.com/300x200',
        alt: 'Image description',
        href: '',
        order,
        parentId,
        children: [],
        style: {
          imageWidth: '100%',
          imageHeight: 'auto',
          imageAlignment: 'center',
        },
      } as Image;

    case 'button':
      return {
        id,
        type: 'button',
        text: 'Click Me',
        href: '#',
        size: 'md',
        order,
        parentId,
        children: [],
        style: {
          backgroundColor: '#3b82f6',
          textColor: '#ffffff',
          borderRadius: 4,
        },
      } as Button;

    case 'divider':
      return {
        id,
        type: 'divider',
        order,
        parentId,
        children: [],
        style: {
          dividerColor: '#e5e7eb',
          dividerStyle: 'solid',
          dividerThickness: '1px',
        },
      } as Divider;

    case 'spacer':
      return {
        id,
        type: 'spacer',
        height: 40,
        order,
        parentId,
        children: [],
        style: {
          spacerColor: 'transparent',
        },
      } as Spacer;

    case 'html':
      return {
        id,
        type: 'html',
        html: '<div>Custom HTML</div>',
        order,
        parentId,
        children: [],
        style: {},
      } as HTML;

    case 'avatar':
      return {
        id,
        type: 'avatar',
        src: 'https://via.placeholder.com/150',
        alt: 'Avatar',
        size: 80,
        shape: 'circle',
        order,
        parentId,
        children: [],
        style: {
          imageWidth: '80px',
          imageHeight: '80px',
          imageAlignment: 'center',
        },
      } as Avatar;

    case 'column':
      return {
        id,
        type: 'column',
        order,
        parentId,
        children: [],
        style: {
          backgroundColor: 'transparent',
          borderRadius: 0,
          borderWidth: 0,
          borderColor: 'transparent',
          paddingTop: 8,
          paddingRight: 8,
          paddingBottom: 8,
          paddingLeft: 8,
        },
      } as Column;

    case 'columns':
      return {
        id,
        type: 'columns',
        order,
        parentId,
        children: [],
        style: {
          mobileStack: true,
        },
      } as Columns;

    case 'container':
      return {
        id,
        type: 'container',
        order,
        parentId,
        children: [],
        style: {
          backgroundColor: '#ffffff',
          width: '600px',
          paddingTop: 16,
          paddingRight: 16,
          paddingBottom: 16,
          paddingLeft: 16,
        },
      } as Container;

    default:
      throw new Error(`Unknown block type: ${type}`);
  }
};
