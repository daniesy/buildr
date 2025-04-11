import { Block } from "./Block";
import { type ContainerStyle } from "./ContainerStyle";

export interface Container extends Block {
    children: Block[];
    style: ContainerStyle;
}