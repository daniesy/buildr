ts
import { Block } from "./Block";
import { type SpacerStyle } from "./SpacerStyle";

export interface Spacer extends Block {
    height: number;
    style: SpacerStyle;
}