import { type BlockStyle } from "./BlockStyle";

export interface DividerStyle extends BlockStyle {
    dividerColor: string;
    dividerStyle: 'solid' | 'dashed' | 'dotted';
    dividerThickness: string;
}