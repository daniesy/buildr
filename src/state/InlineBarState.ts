import { reactive } from "vue";
import { type Position, type PositionedPopupState, type Rect } from "./PositionedPopupState";

interface InlineBarState extends PositionedPopupState {
  active: boolean;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrikeThrough: boolean;
  isSourceVisible: boolean;
  isSubscript: boolean;
  isSuperscript: boolean;
  textColor: string;
  backgroundColor: string;
  hasLink: boolean;
  targetId: string | null;
}

let currentTarget: HTMLElement;

const state: InlineBarState = reactive({
  active: false,
  position: { x: 0, y: 0, width: 0, height: 0 },
  isBold: false,
  isItalic: false,
  isUnderline: false,
  isStrikeThrough: false,
  isSubscript: false,
  isSuperscript: false,
  isSourceVisible: false,
  textColor: "#000000",
  backgroundColor: "transparent",
  hasLink: false,
  targetId: null
});

const checkClickOutside = (event: MouseEvent) => {
  if (currentTarget && !currentTarget.contains(event.target as Node)) {
    state.active = false;
    document.removeEventListener("mouseup", checkClickOutside);
  }
};

let hideTimeout: NodeJS.Timeout | null = null;

export default {
  get state() {
    return state;
  },
  show(targetId: string, target?: HTMLElement) {
    setTimeout(() => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }

      state.active = true;
      state.targetId = targetId;

      if (target) {
        currentTarget = target;
      }

      document.addEventListener("mouseup", checkClickOutside);
    }, 100);
  },
  hide() {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
    }

    hideTimeout = setTimeout(() => {
      state.active = false;
      document.removeEventListener("mouseup", checkClickOutside);
    }, 110);
  },
  setPosition(position: Position, anchor?: Rect) {
    state.position = { ...state.position, ...position };
    if (anchor) {
      state.position.anchor = anchor;
    }
  }
};
