import { reactive } from "vue";
import type { PopupState } from "@/state/PopupState";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Position extends Rect {
  anchor?: Rect;
}

export interface PositionedPopupState extends PopupState {
  position: Position;
}

const state: PositionedPopupState = reactive({
  active: true,
  position: { x: 0, y: 0, width: 0, height: 0 }
});

export default {
  get state() {
    return state;
  },
  show() {
    state.active = true;
  },
  hide() {
    state.active = false;
  },
  setPosition(position: Position, anchor?: Rect) {
    state.position = { ...state.position, ...position };
    if (anchor) {
      state.position.anchor = anchor;
    }
  }
};
