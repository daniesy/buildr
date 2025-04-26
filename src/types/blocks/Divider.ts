import { Block } from "./Block";
import { type DividerStyle } from "../styles/DividerStyle";

export interface Divider extends Block {
    style: DividerStyle;
}