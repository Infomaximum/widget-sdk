import type { EWidgetActionInputMethod, TActionsOnClick } from "./actions";
import type { EColorMode, TColor } from "./color";
import type { ESimpleDataType } from "./data";
import type { TExtendedFormulaFilterValue } from "./filtration";
import type { EFormattingPresets, EFormatTypes } from "@infomaximum/bi-formatting";
import { EActionTypes, type TSchemaType } from ".";
import type { FormatSchema, FormattingSchema } from "./indicators.schema";
import type {
  EOuterAggregation,
  IWidgetDimension,
  TColumnIndicatorValue,
  TWidgetIndicatorAggregationValue,
  TWidgetIndicatorConversionValue,
  TWidgetIndicatorDurationValue,
  TWidgetIndicatorTimeValue,
} from "./indicators";
import type { EMeasureInnerTemplateNames } from "./indicatorsFormulas";
import type {
  IDisplayPredicate,
  IDivePanelDescription,
  ISelectOption,
  IWidgetProcess,
  TMeasureAddButtonSelectOption,
  TRecordAccessor,
  TWidgetDimensionData,
  TWidgetMeasureData,
} from "./metaDescription";
import type { EDisplayConditionMode, IRange, TDisplayCondition } from "./settings/values";
import type { TNullable } from "./utilityTypes";

export type THintPlacement =
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "leftTop"
  | "leftBottom"
  | "rightTop"
  | "rightBottom";

/**
 * Props контрола.
 * Единый контракт для встроенных и кастомных контролов.
 */
export interface IControlProps<
  T extends { value: unknown; props: object } = { value: unknown; props: object },
  DiveState = unknown,
> {
  title?: string;

  value: T["value"];
  setValue(arg: T["value"], resolveSettings?: boolean): void;
  extraProps: T["props"];

  /**
   * Запрашивает погружение в тот же control с новым контекстом (diveState).
   * Система выполняет навигацию и заново монтирует control -
   * его жизненный цикл полностью сбрасывается.
   */
  dive?: (title: string, state?: DiveState) => void;
  /** Состояние текущего погружения */
  diveState?: DiveState;
}

export enum EControlType {
  /** Ввод текста */
  input = "input",
  /** Ввод текста с поддержкой шаблонной вставки сущностей */
  inputTemplate = "inputTemplate",
  /** Ввод текста в формате markdown */
  inputMarkdown = "inputMarkdown",
  /** Ввод числа */
  inputNumber = "inputNumber",
  /** Выбор диапазона чисел */
  inputRange = "inputRange",
  /** Ввод размера (число + единица измерения) */
  size = "size",
  /** Выбор boolean значения через переключатель */
  switch = "switch",
  /** Выбор варианта из выпадающего списка */
  select = "select",
  /** Выбор одного из вариантов, представленных через иконки */
  radioIconGroup = "radioIconGroup",
  /** Ввод значения показателя */
  formula = "formula",
  /** Ввод формулы и ее типа */
  typedFormula = "typedFormula",
  /** Выбор настроек форматирования */
  formatting = "formatting",
  /** Ввод шаблона форматирования */
  formattingTemplate = "formattingTemplate",
  /** Выбор действий по клику */
  actionOnClick = "actionOnClick",
  /** Ввод фильтров */
  filter = "filter",
  /** Ввод условия отображения */
  displayCondition = "displayCondition",
  /** Ввод цвета */
  colorPicker = "colorPicker",
  /** Отображение тегов с возможностью "провалиться" внутрь */
  tagSet = "tagSet",
  /** Множественный выбор событий процесса */
  eventsPicker = "eventsPicker",
  /**
   * @deprecated используется только для виджета "Маршруты", будет перенесено на уровень виджета.
   * Ввод цветов для событий процесса.
   */
  eventsColor = "eventsColor",
}

/**
 * Type-level registry контролов.
 * Единый контракт для встроенных и кастомных контролов.
 */
export type TControlsMap = Record<string, { value: unknown; props: object }>;

type TEmbeddedControl =
  | IInputControl
  | IInputTemplatedControl
  | IInputMarkdownControl
  | IInputNumberControl
  | IInputRangeControl
  | ISizeControl
  | ISwitchControl
  | ISelectControl
  | IRadioIconGroupControl
  | IFormulaControl
  | ITypedFormulaControl
  | IFormattingControl
  | IFormattingTemplateControl
  | IActionOnClickControl
  | IFilterControl
  | IDisplayConditionControl
  | IColorPickerControl
  | ITagSetControl
  | IEventsPickerControl
  | IEventsColorControl;

/**
 * Registry встроенных контролов, автоматически выведенный
 * из discriminated union `TEmbeddedControl` по полю `type`.
 */
type TEmbeddedControlsMap = {
  [C in TEmbeddedControl as C["type"]]: Omit<C, "type">;
};

/**
 * Генерирует union конфигураций контролов из registry.
 * После выбора `type` - строго типизирует соответствующие `value` и `props`.
 */
export type TControlUnion<
  Settings extends object,
  ControlsMap extends TControlsMap = TEmbeddedControlsMap,
> = {
  [K in Extract<keyof ControlsMap, string>]: IControlRecord<Settings, { type: K } & ControlsMap[K]>;
}[Extract<keyof ControlsMap, string>];

type TControlConstraint = { type: string; value: unknown; props: object };

/** Конфигурация элемента управления настройкой */
export interface IControlRecord<
  Settings extends object,
  T extends TControlConstraint = TControlConstraint,
> {
  /** Ключ, должен быть уникальным в рамках одного уровня вложенности */
  key: string;
  /** Локализация заголовка */
  title?: string;
  /** Тип используемого элемента управления из предложенных системой */
  type: T["type"];
  /** Кастомный верхний отступ */
  marginTop?: number;
  /** Объект дополнительных параметров элемента управления */
  props?: T["props"] | ((settings: Settings) => T["props"]);
  /** Описание доступа к значению настройки */
  accessor: TRecordAccessor<Settings, T["value"]>;
  /**
   * Определяет, нужно ли повторно нормализовать `settings` виджета после их изменения
   * через этот элемент управления (для сохранения согласованности зависимых настроек).
   *
   * @note
   * В будущем, кроме boolean, может быть разрешено передавать функцию, но сейчас это избыточно.
   * @default false
   */
  resolveSettings?: boolean;
  /**
   * Рекурсивное определение мета-описания, в элемент управления будет передана функция dive
   * для перехода в указанное мета-описание.
   *
   * Возможность работает только для элемента управления EControlType.tagSet.
   */
  description?: T["type"] extends EControlType.tagSet ? IDivePanelDescription<Settings> : never;
  /**
   * Предикат, позволяющий скрыть элемент управления.
   * Предоставлен для удобства разработки. Скрыть элемент можно и условно добавляя его в мета-описание.
   */
  shouldDisplay?: IDisplayPredicate<Settings>;
  /** Позиционирование поля относительно системных полей (см. {@link IControlRecordPosition}) */
  position?: IControlRecordPosition;
}

/**
 * Контроль позиционирования кастомного поля относительно системных полей
 *
 * @remarks
 * Правила применения:
 * 1. Работает только с ключами системных полей
 * 2. Приоритет: `insertBefore` > `insertAfter` (если указаны оба)
 * 3. Если поле переопределяет системное (через key) - правило игнорируется
 * 4. Если указанный якорь не найден - правило игнорируется
 *
 * Статус реализации:
 * - Не работает на корневом уровне, работает внутри IGroupSetDescription
 *
 * // Планируемое расширение:
 * // 1. Добавить в IControlRecordPosition свойство strict - при true поле не добавляется, если якорь не найден
 * // 2. Поддержка на корневом уровне мета-описания
 */
interface IControlRecordPosition {
  /**
   * Вставить поле перед указанным системным полем
   * @param key - ключ системного поля, перед которым нужно вставить
   */
  insertBefore?: string;

  /**
   * Вставить поле после указанного системного поля
   * @param key - ключ системного поля, после которого нужно вставить
   */
  insertAfter?: string;
}

export interface IInputControl {
  type: EControlType.input;
  value: string;
  props: {
    placeholder?: string;
    /** Максимальное количество символов которое можно ввести в поле */
    maxLength?: number;
    onFocus?: (e: FocusEvent) => void;
    /** Обрабатывать ли изменения по onBlur */
    isChangeOnBlur?: boolean;
    /** Использовать ли уменьшенный размер заголовка */
    isSmallTitle?: boolean;
    disabled?: boolean;
    hintText?: string;
    hintPlacement?: THintPlacement;
  };
}

export interface IInputTemplatedControl {
  type: EControlType.inputTemplate;
  value: string;
  props: {};
}

export interface IInputMarkdownControl {
  type: EControlType.inputMarkdown;
  value: string;
  props: {};
}

export interface IInputNumberControl {
  type: EControlType.inputNumber;
  value: number | null;
  props: {
    min?: number;
    max?: number;
    /**
     * Число, на которое увеличивается или уменьшается текущее значение при нажатии на стрелку.
     * Это может быть целое или десятичное число.
     */
    step?: number;
    placeholder?: string;
    /**
     * Текстовая метка, которая отображает любую контекстную информацию о поле, например,
     * единицы измерения.
     */
    unitLabel?: string;
    isClearable?: boolean;
    disabled?: boolean;
    layout?: "vertical" | "horizontal";
  };
}

export interface IInputRangeControl {
  type: EControlType.inputRange;
  value: IRange;
  props: {
    min?: number;
    max?: number;
    units?: { key: string; label: string }[];
    prepareValue?: (value: [number?, number?]) => [number?, number?];
    disabled?: boolean;
  };
}

export enum EUnitMode {
  PIXEL = "PIXEL",
  PERCENT = "PERCENT",
}

export interface ISizeControl {
  type: EControlType.size;
  value: { value: number | null; mode: EUnitMode };
  props: {
    placeholder?: string;
    disabled?: boolean;
    isClearable?: boolean;
    minMaxByMode?: {
      [EUnitMode.PIXEL]: { min?: number; max?: number };
      [EUnitMode.PERCENT]: { min?: number; max?: number };
    };
  };
}

export interface ISwitchControl {
  type: EControlType.switch;
  value: boolean;
  props: {
    size?: "small" | "default";
    disabled?: boolean;
  };
}

export interface ISelectControl {
  type: EControlType.select;
  value: TNullable<string>;
  props: {
    fetchOptions?: (
      searchText?: string
    ) => Promise<ISelectOption[] | { isAllRequested: boolean; options: ISelectOption[] }>;
    options?: ISelectOption[];
    withSearch?: boolean;
    error?: string;
    allowClear?: boolean;
    size?: "small" | "default";
    placeholder?: string;
    disabled?: boolean;
    status?: "error" | "warning";
  };
}

export interface IRadioIconGroupControl<Icon = string> {
  type: EControlType.radioIconGroup;
  value: string;
  props: {
    disabled?: boolean;
    options: {
      value: string;
      /** Иконка */
      label: Icon;
      disabled?: boolean;
    }[];
  };
}

export interface IFormulaControl {
  type: EControlType.formula;
  value: {
    value:
      | TColumnIndicatorValue
      | (TWidgetIndicatorAggregationValue & {
          outerAggregation: EOuterAggregation;
        })
      | (TWidgetIndicatorAggregationValue & { innerTemplateName?: string })
      | TWidgetIndicatorConversionValue
      | TWidgetIndicatorDurationValue
      | TWidgetIndicatorTimeValue;
    dbDataType: string | undefined;
  };
  props: {
    indicatorConfig?:
      | ({
          type: "measure";
          templates?: TWidgetMeasureData["templates"];
          innerTemplateNames?: EMeasureInnerTemplateNames[];
        } & {
          /** @deprecated временное решение для виджета "Воронка", не следует использовать [BI-14710] */
          allowClear?: boolean;
          /** @deprecated временное решение для виджета "Воронка", не следует использовать [BI-14710] */
          placeholder?: string;
          /** @deprecated временное решение для виджета "Воронка", не следует использовать [BI-14710] */
          hideQuantityOption?: boolean;
          /** @deprecated временное решение для виджета "Воронка", не следует использовать [BI-14710] */
          options?: TMeasureAddButtonSelectOption[];
        })
      | {
          type: "dimension";
          templates?: TWidgetDimensionData["templates"];
          processTimeTemplates?: TWidgetDimensionData["processTimeTemplates"];
        };
    disabled?: boolean;
    /** Ключи процессов для фильтрации таблиц, доступных для выбора */
    processKeys?: Iterable<string>;
    titleModal?: string;
  };
}

export interface ITypedFormulaControl {
  type: EControlType.typedFormula;
  value: {
    formula: string;
    dbDataType?: string;
  };
  props: {
    disabled?: boolean;
    titleModal?: string;
  };
}

export interface IFormattingControl {
  type: EControlType.formatting;
  value: {
    format?: TSchemaType<typeof FormatSchema>;
    formatting?: TSchemaType<typeof FormattingSchema>;
  };
  props: {
    formats?: Partial<Record<ESimpleDataType, EFormatTypes[]>>;
    formatting?: Partial<Record<EFormatTypes, EFormattingPresets[]>>;
    dbDataType: TNullable<string>;
  };
}

export interface IFormattingTemplateControl {
  type: EControlType.formattingTemplate;
  value: string;
  props: {
    /** Используемый формат (влияет на контент подсказки) */
    format?: TNullable<EFormatTypes>;
  };
}

interface ICommonActionConfig {
  /**
   * Определяет доступность действия.
   *
   * - `true` - действие доступно для отображения и выполнения.
   * - `false` - действие недоступно без указания причины.
   * - `string` - действие недоступно. Значение содержит причину недоступности.
   */
  availability: boolean | string;
  extraInputMethods?: EWidgetActionInputMethod[];
}

export type TActionsConfig = Partial<{
  [EActionTypes.UPDATE_VARIABLE]: ICommonActionConfig;
  [EActionTypes.OPEN_VIEW]: ICommonActionConfig;
  [EActionTypes.DRILL_DOWN]: Omit<ICommonActionConfig, "extraInputMethods">;
  [EActionTypes.OPEN_URL]: Omit<ICommonActionConfig, "extraInputMethods">;
  [EActionTypes.EXECUTE_SCRIPT]: ICommonActionConfig & {
    showActivateCondition?: boolean;
  };
}>;

export const defaultActionsConfig = {
  OPEN_URL: { availability: true },
  UPDATE_VARIABLE: { availability: true },
  EXECUTE_SCRIPT: { availability: true },
  OPEN_VIEW: { availability: true },
};

export interface IActionOnClickControl {
  type: EControlType.actionOnClick;
  value: TActionsOnClick[];
  props: {
    /** Заголовок для отображения при проваливании */
    diveTitle: string;
    /** Общие способы ввода для всех действий с параметрами */
    inputMethods: EWidgetActionInputMethod[];
    /**
     * Объект точечной конфигурации действия по типу, отобразятся только те действия, которые описаны в нем
     * @default {defaultActionsConfig}
     */
    actionsConfig?: TActionsConfig;
  };
}

export interface IFilterControl {
  type: EControlType.filter;
  value: TExtendedFormulaFilterValue[];
  props: {
    buttonTitle?: string;
    /** Ключи процессов для фильтрации таблиц, доступных для выбора */
    processKeys?: Iterable<string>;
  };
}

export interface IDisplayConditionControl {
  type: EControlType.displayCondition;
  value: TDisplayCondition;
  props: {
    isInMeasure?: boolean;
    labelFontSize?: number;
    modes?: EDisplayConditionMode[];
  };
}

export interface IColorPickerControl {
  type: EControlType.colorPicker;
  value: TColor | undefined;
  props: {
    ruleModes?: EColorMode[];
    modes?: EColorMode[];
    /** Цвет по умолчанию для режима BASE при переключении с другого режима */
    defaultColor?: string;
    dimension?: IWidgetDimension;
    disabled?: boolean;
  };
}

export interface ITagSetControl {
  type: EControlType.tagSet;
  value: string[];
  props: {
    placeholder?: string;
    isError?: boolean;
  };
}

export interface IEventsPickerControl {
  type: EControlType.eventsPicker;
  value: (string | null)[];
  props: {
    process: IWidgetProcess | undefined;
    withPercentageSelection?: boolean;
  };
}

export interface IEventsColorControl {
  type: EControlType.eventsColor;
  value: {
    defaultColor: string;
    values: Record<string, { mode: EColorMode; value: string }>;
  };
  props: Omit<IColorPickerControl["props"], "defaultColor"> & {
    defaultColor?: ((eventName: string) => string) | string;
    processName: string;
  };
}
