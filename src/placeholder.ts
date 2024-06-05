export interface IWidgetPlaceholderController {
  setError(value: Error | null): void;
  setConfigured(value: boolean): void;
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
