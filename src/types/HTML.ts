ts
import { Block } from "./Block";
import { type HTMLStyle } from "./HTMLStyle";

export interface HTML extends Block {
    html: string;
    style: HTMLStyle;
}