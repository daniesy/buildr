import { Block } from "./Block";

export interface Column extends Block {
    children: Block[];
}