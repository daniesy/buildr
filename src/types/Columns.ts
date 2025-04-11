ts
import { Block } from "./Block";
import { type ColumnsStyle } from "./ColumnsStyle";

export interface Columns extends Block {
    children: Block[];
    gap: string;
    alignment: string;
    columnCount: number;
    columnWidths: string[];
    style: ColumnsStyle;
}