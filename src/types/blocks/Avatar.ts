import { Block } from "./Block";
import { type AvatarStyle } from "../styles/AvatarStyle";

export interface Avatar extends Block {
    size: number;
    shape: "circle" | "square" | "rounded";
    alt: string;
    src: string;
    style: AvatarStyle;
}