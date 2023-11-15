/// <reference types="@infomaximum/global-types" />

import type { ELanguages } from "@infomaximum/localization";
import type { ICalculatorFilter, IWidgetFiltration } from "./filtration";
import type { IWidgetFormatting } from "./formatting";
import type {
  IWidgetDimension,
  IWidgetDimensionHierarchy,
  IWidgetMeasure,
  TWidgetVariable,
} from "./indicators";
import {
  type IPanelDescriptionCreator,
  type IWidgetProcess,
} from "./metaDescription";
import type { IWidgetPlaceholderController } from "./placeholder";
import type { IWidgetsContext } from "./widgetContext";
import type { IWidgetAction } from "./actions";
export { ELanguages } from "@infomaximum/localization";
export { EFilteringMethodValues } from "@infomaximum/base-filter";

export * from "./actions";
export * from "./calculators";
export * from "./controls";
export * from "./data";
export * from "./filtration";
export * from "./formatting";
export * from "./indicators";
export * from "./metaDescription";
export * from "./placeholder";
export * from "./settings/baseWidget.types";
export * from "./settings/values.types";
export * from "./sorting";
export * from "./widgetContext";

export interface IWidgetApiProps<WidgetSettings extends Record<string, any>> {
  language: ELanguages;
  calculatorFactory: {
    general: () => any;
    processGraph: () => any;
  };
  captureFocus: () => void;
  /** @deprecated - режим дашборда приходит в widgetsContext */
  isViewMode: boolean;
  subscribeOnFocusOut: (subscriber: () => void) => void;
  settings: WidgetSettings;
  manifest: Record<string, any>;
  /** @deprecated - процессы приходят в widgetsContext */
  processes: Map<string, IWidgetProcess>;
  bodyElement: HTMLBodyElement;
  rootViewContainer: HTMLDivElement;
  /** Объект для взаимодействия с фильтрацией */
  filtration: IWidgetFiltration;
  /** Объект для управления плейсхолдером */
  placeholder: IWidgetPlaceholderController;
  /** @deprecated - значения переменных на дашборде приходят в widgetsContext */
  variables: Map<string, TWidgetVariable>;
  formatting: IWidgetFormatting;
  /** Получить ресурс виджета */
  getWidgetAsset: (fileName: string) => Promise<Blob | null>;
  widgetsContext: IWidgetsContext;
  /** Вызывает модальное окно для запуска действия */
  launchAction(params: {
    action: IWidgetAction;
    onSuccess: () => void;
    filters: ICalculatorFilter[];
  }): void;
  guid: string;
}

export type WidgetProps<
  P extends IWidgetApiProps<WidgetSettings>,
  WidgetSettings extends Record<string, any>,
> = P;

export interface IWidget<
  P extends IWidgetApiProps<WidgetSettings>,
  WidgetSettings extends Record<string, any>,
> {
  initialize(container: HTMLElement): void;
  mount(container: HTMLElement, props: P): void;
  update(container: HTMLElement, props: P): void;
  unmount(container: HTMLElement): void;
}

export interface IWidgetClass<
  Props extends IWidgetApiProps<WidgetSettings>,
  WidgetSettings extends Record<string, any>,
  GroupSettings extends Record<string, any>,
> {
  new (): IWidget<Props, WidgetSettings>;

  createPanelDescription: IPanelDescriptionCreator<
    WidgetSettings,
    GroupSettings
  >;

  fillSettings?(settings: WidgetSettings, context: IWidgetsContext): void;

  getDimensions?(
    settings: WidgetSettings
  ): (IWidgetDimension | IWidgetDimensionHierarchy)[];
  getMeasures?(settings: WidgetSettings): IWidgetMeasure[];
}

declare global {
  interface Infomaximum {
    defineWidget: <
      Props extends IWidgetApiProps<WidgetSettings>,
      WidgetSettings extends Record<string, any>,
      GroupSettings extends Record<string, any>,
    >(
      uuid: string,
      Widget: IWidgetClass<Props, WidgetSettings, GroupSettings>
    ) => void;
  }
}
