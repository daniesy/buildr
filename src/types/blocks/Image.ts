import { Block } from "./Block";
import { type ImageStyle } from "../styles/ImageStyle";

export interface Image extends Block {
    src: string;
    alt: string;
    href: string;
    style: ImageStyle;
}