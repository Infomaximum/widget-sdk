import type { TActionsOnClick } from "./actions";

export type TContextMenu = (TContextMenuList | TContextMenuButtonGroup) & {
  /**
   * Событие мыши, по которому пользователь открыл меню.
   * Используется для автоматического определения позиции меню.
   */
  event?: MouseEvent;
  /** Явно указанная позиция меню */
  position?: {
    unitX?: TContextMenuPositionUnit;
    unitY?: TContextMenuPositionUnit;
    x?: number;
    y?: number;
  };
  /** Относительно чего позиционируется меню */
  positionOrigin?: "frame" | "workArea" | HTMLElement;
  /** Каким элементом ограничено расположение меню */
  boundingContainer?: HTMLElement;
  /** Положение меню относительно его позиции */
  placement?: "topRight" | "topLeft" | "bottomRight" | "bottomLeft";
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
  tooltip?: {
    title: string;
    offset?: [number | `${number}%`, number | `${number}%`];
  };
  onClick: () => void;
};

export type TContextMenuButtonOptions = {
  key: string;
  type: "options";
  icon: string;
  items: TContextMenuRow[];
};
