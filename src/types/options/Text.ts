import { Option } from '@/types/options/Option';

export const fontSizes: string[] = [
  '6',
  '7',
  '8',
  '9',
  '10',
  '12',
  '14',
  '16',
  '18',
  '21',
  '24',
  '28',
  '32',
  '36',
  '42',
  '48',
  '55',
  '63',
  '73',
  '84',
  '96',
  '108',
  '120',
];

export const fontWeights: Option[] = [
  {
    label: 'Thin',
    value: '100',
  },
  {
    label: 'Extra Light',
    value: '200',
    initial: true,
  },
  {
    label: 'Light',
    value: '300',
  },
  {
    label: 'Regular',
    value: '400',
    initial: true,
  },
  {
    label: 'Medium',
    value: '500',
  },
  {
    label: 'Semi Bold',
    value: '600',
  },
  {
    label: 'Bold',
    value: '700',
    initial: true,
  },
  {
    label: 'Extra Bold',
    value: '800',
  },
  {
    label: 'Black',
    value: '900',
  },
];

export const textAligns: Option[] = [
  {
    label: 'Left',
    value: 'left',
  },
  {
    label: 'Center',
    value: 'center',
  },
  {
    label: 'Right',
    value: 'right',
  },
];
