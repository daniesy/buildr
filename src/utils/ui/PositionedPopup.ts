import { reactive } from "vue";

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Position extends Rect {
  anchor?: Rect;
}

export interface PositionedState {
  active: boolean;
  position: Position;
  callback?: Callback;
}

export interface PopupCallbackArguments {
  command: string;
  args: any[];
}

type Callback = (args?: PopupCallbackArguments) => void;

const state: PositionedState = reactive({
  active: true,
  position: { x: 0, y: 0, width: 0, height: 0 }
});

export default {
  get state() {
    return state;
  },
  show(callback?: Callback) {
    state.active = true;
    state.callback = callback;
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
