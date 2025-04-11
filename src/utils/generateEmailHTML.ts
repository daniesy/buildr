import { Block } from "../types/Block";
import { Text } from "../types/Text";
import { Avatar } from "../types/Avatar";
import { Button } from "../types/Button";
import { Columns } from "../types/Columns";
import { Container } from "../types/Container";
import { Divider } from "../types/Divider";
import { Heading } from "../types/Heading";
import { HTML as HTMLBlockType } from "../types/HTML";
import { Image } from "../types/Image";
import { Spacer } from "../types/Spacer";
import { Column } from "../types/Column";

function renderBlock(block: Block): string {
  switch (block.type) {
    case "text":
      return `<div>${(block as Text).text}</div>`;
    case "avatar":
      return `<img src="${(block as Avatar).src}" alt="Avatar">`;
    case "button":
      return `<a href="${(block as Button).href}">${(block as Button).text}</a>`;
    case "columns":
      const columns = (block as Columns).children;
      const columnHTML = columns
        .map((column) => renderBlock(column))
        .join("");
      return `<table style="width: 100%; border-collapse: collapse;"><tr>${columnHTML}</tr></table>`;
    case "column":
      return `<td style="padding: 10px; vertical-align: top;">${(block as Column).children.map(renderBlock).join("")}</td>`;
    case "container":
      return `<div class="container">${(block as Container).children.map(renderBlock).join("")}</div>`;
    case "divider":
      return `<hr>`;
    case "heading":
      return `<h1>${(block as Heading).text}</h1>`;
    case "html":
      return `<div>${(block as HTMLBlockType).html}</div>`;
    case "image":
      return `<img src="${(block as Image).src}" alt="Image">`;
    case "spacer":
      return `<div style="height: ${(block as Spacer).height}px;"></div>`;
    default:
      return `<div>Unknown block type: ${block.type}</div>`;
  }
}

function generateEmailHTML(blocks: Block[]): string {
  const bodyContent = blocks.map(renderBlock).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email</title>
</head>
<body>
  ${bodyContent}
</body>
</html>`;
}

export default generateEmailHTML;