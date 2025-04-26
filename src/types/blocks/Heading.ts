import { Block } from "./Block";
import { type HeadingStyle } from "../styles/HeadingStyle";

export interface Heading extends Block {
    text: string;
    style: HeadingStyle;
    level: 1 | 2 | 3;
}