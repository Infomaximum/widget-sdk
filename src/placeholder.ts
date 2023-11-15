export interface IWidgetPlaceholderController {
  setError(value: Error | null): void;
  setConfigured(value: boolean): void;
  setDisplay(value: boolean): void;
  setEmpty(value: boolean): void;
}
