import { BlockStyle } from "./BlockStyle";

export interface Block {
  id: string;
  type: string;
  content: string;
  order: number;
  parentId: string | null;
  children: Block[];
  style: BlockStyle;
};
