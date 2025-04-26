ts
import { Block } from "./Block";
import { type HTMLStyle } from "../styles/HTMLStyle";

export interface HTML extends Block {
    html: string;
    style: HTMLStyle;
}