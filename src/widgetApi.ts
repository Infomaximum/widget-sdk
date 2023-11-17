import type { ELanguages } from "@infomaximum/localization";
import type { IBaseWidgetSettings } from "./settings/baseWidget.types";
import type {
  IPanelDescriptionCreator,
  IWidgetProcess,
} from "./metaDescription";
import type { IWidgetFiltration } from "./filtration";
import type { IWidgetPlaceholderController } from "./placeholder";
import type {
  IWidgetDimension,
  IWidgetDimensionHierarchy,
  IWidgetMeasure,
  TWidgetVariable,
} from "./indicators";
import type { IWidgetFormatting } from "./formatting";
import type { IWidgetsContext } from "./widgetContext";
import type { IWidgetAction } from "./actions";
import type { ICalculatorFilter } from "./calculators/calculator/calculator";
import type { ICalculatorFactory } from "./calculators";

export interface IWidgetApiProps<WidgetSettings extends IBaseWidgetSettings> {
  language: ELanguages;
  calculatorFactory: ICalculatorFactory;
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
  WidgetSettings extends IBaseWidgetSettings,
> = P;

export interface IWidget<
  P extends IWidgetApiProps<WidgetSettings>,
  WidgetSettings extends IBaseWidgetSettings,
> {
  initialize(container: HTMLElement): void;
  mount(container: HTMLElement, props: P): void;
  update(container: HTMLElement, props: P): void;
  unmount(container: HTMLElement): void;
}

export interface IWidgetClass<
  Props extends IWidgetApiProps<WidgetSettings>,
  WidgetSettings extends IBaseWidgetSettings,
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
