import type { TActionsOnClick } from "./actions";

export type TContextMenu = (TContextMenuList | TContextMenuButtonGroup) & {
  event?: MouseEvent;
  placement?: "topRight" | "topLeft" | "bottomRight" | "bottomLeft";
  positionOrigin?: "frame" | "workArea";
  position?: {
    unitX?: TContextMenuPositionUnit;
    unitY?: TContextMenuPositionUnit;
    x?: number;
    y?: number;
  };
};

export type TContextMenuPositionUnit = "%" | "px";

export type TContextMenuList = {
  type: "list";
  items: TContextMenuRow[];
};

export type TContextMenuButtonGroup = {
  type: "buttonGroup";
  items: TContextMenuButton[];
};

export type TContextMenuRow = {
  key: string;
  label: string;
  onClick: () => void;
    tooltip?: {
    title: string;
    offset?: [number | `${number}%`, number | `${number}%`];
  };
};

export type TContextMenuButton =
  | TContextMenuButtonActions
  | TContextMenuButtonClose
  | TContextMenuButtonApply
  | TContextMenuButtonCustom
  | TContextMenuButtonOptions;

export type TContextMenuButtonActions = {
  type: "actions";
  actions: TActionsOnClick[];
  onClick: (action: TActionsOnClick) => void;
};

export type TContextMenuButtonClose = {
  type: "close";
  onClick?: () => void;
};

export type TContextMenuButtonApply = {
  type: "apply";
  onClick: () => void;
};

export type TContextMenuButtonCustom = {
  key: string;
  type: "custom";
  icon: string;
  onClick: () => void;
};

export type TContextMenuButtonOptions = {
  key: string;
  type: "options";
  icon: string;
  items: TContextMenuRow[];
};
