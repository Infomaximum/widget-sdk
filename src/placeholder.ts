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
  setOverlay(value: boolean): void;
  setCustomEmptyTexts(noFilter: string | null, withFilter: string | null): void;
}

export interface IWidgetPlaceholderValues {
  error: Error | null;
  isDisplay: boolean | undefined;
  isEmpty: boolean;
  isOverlay: boolean;
  emptyText: string | null;
  emptyWithFilterText: string | null;
}
