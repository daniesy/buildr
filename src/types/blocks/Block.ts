import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { Column } from "./Column";
import { Columns } from "./Columns";
import { Container } from "./Container";
import { Divider } from "./Divider";
import { Heading } from "./Heading";

export interface Block {
  id: string;
  type: string;
  order: number;
  parentId: string | null;
  children: Block[];
};


export type BlockType = Avatar | Button | Columns | Column | Container | Divider | Heading;