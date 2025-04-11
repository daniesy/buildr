import { type DirectiveBinding } from "vue";

interface ContentEditableElement extends HTMLElement {
  value: string; 
}

export const contentEditable = {
  mounted(el: ContentEditableElement, { value }: DirectiveBinding, vNode: any) {
    el.setAttribute("contenteditable", "true");

    el.innerHTML = value;
    el.addEventListener("input", () => {
      vNode.ctx.emit("update:modelValue", el.innerHTML);
    });

    el.addEventListener("change", () => {
      vNode.ctx.emit("update:modelValue", el.innerHTML);
    });
  },

  beforeUpdate(el: ContentEditableElement, { value }: DirectiveBinding) {
    if (el.innerHTML !== value) {
      el.innerHTML = value;
    }
  }
};
