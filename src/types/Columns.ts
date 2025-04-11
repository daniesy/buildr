ts
import { Block } from "./Block";

export interface Columns extends Block {
    children: Block[];
    columnCount: number;
}