import type { ELanguages } from "@infomaximum/localization";
import type { IBaseWidgetSettings } from "./settings/baseWidget";
import type { IGroupSettings, IWidgetProcess } from "./metaDescription";
import type { IWidgetFiltration } from "./filtration";
import type { IWidgetPlaceholderController } from "./placeholder";
import type { TWidgetVariable } from "./indicators";
import type { IWidgetFormatting } from "./formatting";
import type { IWidgetsContext } from "./widgetContext";
import type { TActionsOnClick } from "./actions";
import type { ICalculatorFilter } from "./calculators/calculator/calculator";
import type { ICalculatorFactory } from "./calculators";
import type { IDefinition } from "./definition";

export type TLaunchActionParams = {
  action: TActionsOnClick;
  onSuccess: () => void;
  filters: ICalculatorFilter[];
  needConfirmation?: boolean;
};

export type TWidgetContainer = {
  /** Имеет ли контейнер виджета ограниченную максимальную высоту */
  isMaxHeightLimited: boolean;
};

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

  /** Контекст виджетов */
  widgetsContext: IWidgetsContext;

  /** Данные о контейнере виджета */
  widgetContainer: TWidgetContainer;
  /** Запуск действия */
  launchAction(params: TLaunchActionParams): void;
}

export interface ICustomWidgetProps<
  WidgetSettings extends IBaseWidgetSettings = IBaseWidgetSettings,
> extends IWidgetProps<WidgetSettings> {
  /** @deprecated - нужно использовать из widgetsContext */
  language: ELanguages;

  /**
   * режим дашборда
   * @deprecated 2401 - необходимо использовать displayMode из widgetsContext */
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
  /** метод будет вызван при добавлении виджета в отчет
   * и после загрузки исходного кода виджета. В данном методе
   * можно инициализировать библиотеку отображения, создать
   * дополнительные DOM-элементы и подготовить виджет перед
   * вызовом метода mount
   *
   * @param container - DOM элемент в котором будет отображаться виджет
   * */
  initialize(container: HTMLElement): void;
  /**
   * метод будет вызван после добавления виджета в отчет, в тот момент
   * когда система будет готова отобразить виджет. В данном методе можно
   * начать визуализировать виджет
   * @param container - DOM элемент в котором будет отображаться виджет
   * @param props - содержит информацию которую система передаёт виджетам,
   * например, язык используемый системой, информация об отчете, настройки,
   * фабрику вычислителей и.др.
   */
  mount(
    container: HTMLElement,
    props: ICustomWidgetProps<WidgetSettings>
  ): void;

  /**
   * метод будет вызываться каждый раз, когда props были обновлены и необходимо
   * выполнить перерисовку виджета
   * @param container - DOM элемент в котором будет отображаться виджет
   * @param props - содержит информацию которую система передаёт виджетам,
   * например, язык используемый системой, информация об отчете, настройки,
   * фабрику вычислителей и.др.
   */
  update(
    container: HTMLElement,
    props: ICustomWidgetProps<WidgetSettings>
  ): void;
  /**
   * метод будет вызван когда происходит размонтирование виджета, например,
   * пользователь удаляет виджет со страницы отчета
   * @param container - DOM элемент в котором отображался виджет
   */
  unmount(container: HTMLElement): void;
}

export interface IFillSettings<WidgetSettings extends IBaseWidgetSettings> {
  (settings: Partial<WidgetSettings>, context: IWidgetsContext): void;
}

export interface IWidgetEntity<
  WidgetSettings extends IBaseWidgetSettings,
  GroupSettings extends IGroupSettings,
> {
  new (): IWidget<WidgetSettings>;
  definition: IDefinition<WidgetSettings, GroupSettings>;
}
