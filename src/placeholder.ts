export interface IWidgetPlaceholderController {
  setError(value: Error | null): void;
  setConfigured(value: boolean): void;
  /**
   * Устанавливает состояние видимости виджета.
   *
   * После вызова данного метода виджет станет доступен для отображения.
   * Это предотвращает мерцание при первом появлении виджета на экране.
   * Метод должен быть вызван после полной готовности виджета: все необходимые данные загружены, высота установлена.
   */
  setDisplay(value: boolean): void;
  setEmpty(value: boolean): void;
  setOverlay(value: boolean): void;
}

export interface IWidgetPlaceholderValues {
  error: Error | null;
  isConfigured: boolean;
  isDisplay: boolean | undefined;
  isEmpty: boolean;
  isOverlay: boolean;
}
