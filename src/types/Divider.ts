import { Block } from "./Block";
import { type DividerStyle } from "./DividerStyle";

export interface Divider extends Block {
    style: DividerStyle;
}