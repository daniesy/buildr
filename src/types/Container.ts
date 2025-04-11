import { Block } from "./Block";

export interface Container extends Block {
    children: Block[];
}