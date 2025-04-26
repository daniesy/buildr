import { Block } from "./Block";
import { TextStyle } from "../styles/TextStyle";

export interface Text extends Block {
    text: string;
    style: TextStyle;
}
