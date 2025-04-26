import { Block } from "./Block";
import { type ContainerStyle } from "../styles/ContainerStyle";

export interface Container extends Block {
    children: Block[];
    style: ContainerStyle;
}