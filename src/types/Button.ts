import { Block } from "./Block";
import { ButtonStyle } from "./ButtonStyle";

export interface Button extends Block {
    text: string;
    href: string
    size: 'xs' | 'sm' | 'md' | 'lg'
    style: ButtonStyle;
}