import type { ELanguages } from "@infomaximum/localization";
import type { IBaseWidgetSettings } from "./settings/baseWidget";
import type {
  IGroupSettings,
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

export interface IWidgetProps<
  WidgetSettings extends IBaseWidgetSettings = IBaseWidgetSettings,
> {
  /** guid виджета */
  guid: string;
  /** Настройки виджета */
  settings: WidgetSettings;

  /** Объект для взаимодействия с фильтрацией */
  filtration: IWidgetFiltration;

  /** Функция для подписки на расфокусировку виджета */
  subscribeOnFocusOut(subscriber: () => void): void;
  /** Захватить фокус: остальные виджеты будут оповещены о расфокусировке */
  captureFocus(): void;

  /** Фабрика вычислителей. */
  calculatorFactory: ICalculatorFactory;
  /**
   * Корневой контейнер отчета.
   * Служит для возможности использования портала внутри виджетов.
   */
  rootViewContainer: HTMLDivElement;

  /** Объект для управления плейсхолдером */
  placeholder: IWidgetPlaceholderController;

  /** Контекст виджета */
  widgetsContext: IWidgetsContext;

  /** Вызывает модальное окно для запуска действия */
  launchAction(params: {
    action: IWidgetAction;
    onSuccess: () => void;
    filters: ICalculatorFilter[];
  }): void;
}

export interface ICustomWidgetProps<
  WidgetSettings extends IBaseWidgetSettings = IBaseWidgetSettings,
> extends IWidgetProps<WidgetSettings> {
  /** @deprecated - нужно использовать из widgetsContext */
  language: ELanguages;

  /** @deprecated - режим дашборда приходит в widgetsContext */
  isViewMode: boolean;
  /** манифест виджета */
  manifest: Record<string, any>;
  /** @deprecated - процессы приходят в widgetsContext */
  processes: Map<string, IWidgetProcess>;
  /** body DOM элемент родительского приложения */
  bodyElement: HTMLBodyElement;
  /** @deprecated - значения переменных на дашборде нужно использовать из widgetsContext */
  variables: Map<string, TWidgetVariable>;
  /** Форматирование */
  formatting: IWidgetFormatting;
  /** Получить ресурс виджета по имени файла */
  getWidgetAsset: (fileName: string) => Promise<Blob | null>;
}

export interface IWidget<WidgetSettings extends IBaseWidgetSettings> {
  initialize(container: HTMLElement): void;
  mount(
    container: HTMLElement,
    props: ICustomWidgetProps<WidgetSettings>
  ): void;
  update(
    container: HTMLElement,
    props: ICustomWidgetProps<WidgetSettings>
  ): void;
  unmount(container: HTMLElement): void;
}

export interface IFillSettings<WidgetSettings extends IBaseWidgetSettings> {
  (settings: WidgetSettings, context: IWidgetsContext): void;
}

export interface IWidgetDefinition<
  WidgetSettings extends IBaseWidgetSettings,
  GroupSettings extends IGroupSettings,
> {
  new (): IWidget<WidgetSettings>;

  createPanelDescription: IPanelDescriptionCreator<
    WidgetSettings,
    GroupSettings
  >;

  fillSettings?: IFillSettings<WidgetSettings>;

  getDimensions?(
    settings: WidgetSettings
  ): (IWidgetDimension | IWidgetDimensionHierarchy)[];
  getMeasures?(settings: WidgetSettings): IWidgetMeasure[];
}
