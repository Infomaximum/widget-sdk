export interface IWidgetPlaceholderController {
  setError(value: Error | null): void;
  /**
   * Сообщает о готовности виджета к отображению.
   *
   * Это предотвращает мерцание при первом появлении виджета на экране.
   * Метод должен быть вызван после полной готовности виджета: все необходимые данные загружены, высота установлена.
   */
  setDisplay(value: boolean): void;
  setEmpty(value: boolean): void;
  setOverlay(value: true): void;
  setOverlay(value: false, placeholderPlacement: "before" | "after"): void;
}

export interface IWidgetPlaceholderValues {
  error: Error | null;
  isDisplay: boolean | undefined;
  isEmpty: boolean;
  isOverlay: boolean;
  placeholderPlacement?: "before" | "after";
}
