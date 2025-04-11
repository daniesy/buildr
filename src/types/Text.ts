import { Block } from "./Block";
import { TextStyle } from "./TextStyle";

export interface Text extends Block {
    text: string;
    style: TextStyle;
}
