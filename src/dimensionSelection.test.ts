import { EFormatTypes } from "@infomaximum/bi-formatting";
import { ECalculatorFilterMethods } from "./calculators";
import { EClickHouseBaseTypes } from "./clickHouseTypes";
import { replaceFiltersBySelection } from "./dimensionSelection";

const mockDimensionFilter = [
  {
    isReadonly: false,
    filterValue: {
      name: "trimmed_name",
      format: EFormatTypes.STRING,
      formula: '"events (1)"."trimmed_name"',
      filteringMethod: ECalculatorFilterMethods.INCLUDE,
      dbDataType: EClickHouseBaseTypes.String,
      checkedValues: ["Ввод данных объекта"],
      formValues: {},
    },
    preparedFilterValue: {
      formula: '"events (1)"."trimmed_name"',
      filteringMethod: ECalculatorFilterMethods.INCLUDE,
      dbDataType: EClickHouseBaseTypes.String,
      values: ["Ввод данных объекта"],
    },
  },
];

const mockProcessFilter = [
  {
    isReadonly: false,
    filterValue: {
      eventName: "Дополнительная проверка 1",
      processName: "Новый процесс",
      processKey: "key",
    },
    preparedFilterValue: {
      formula:
        'process(argMaxIf("phases (1)"."phase", "phases (1)"."event_time", 1) = \'Дополнительная проверка 1\', "cases (1)"."application_id")',
      values: ["1"],
      filteringMethod: ECalculatorFilterMethods.EQUAL_TO,
      dbDataType: EClickHouseBaseTypes.Bool,
    },
  },
];

const mockStageFilter = [
  {
    isReadonly: false,
    filterValue: {
      widgetKey: "funnel-chart",
      name: "funnel-chart",
      stages: [
        {
          id: 1,
          name: "Этап процесса",
          formula: 'process(count() > 0, "cases (1)"."application_id") > 0',
          isSelected: false,
        },
        {
          id: 2,
          name: "Этап процесса (1)",
          formula: '("phases (1)"."phase" = \'Подготовка кредитных документов\')',
          isSelected: true,
        },
      ],
    },
    preparedFilterValue: {
      values: ["1"],
      formula: '("phases (1)"."phase" = \'Подготовка кредитных документов\')',
      dbDataType: EClickHouseBaseTypes.Bool,
      filteringMethod: ECalculatorFilterMethods.EQUAL_TO,
    },
  },
];

describe("Тестирование replaceFiltersBySelection", () => {
  it("Фильтрация в самом виджете (Таблица)", () => {
    const mockSelection = new Map([
      [
        '"events (1)"."trimmed_name"',
        {
          values: new Set(["Ввод данных объекта"]),
          replacedFilter: null,
        },
      ],
    ]);

    const value = replaceFiltersBySelection(mockDimensionFilter, mockSelection);

    expect(value).toEqual([]);
  });
  it("Фильтр вне виджета, добавленный Столбиковой диаграммой, проверяется Таблица", () => {
    const value = replaceFiltersBySelection(mockDimensionFilter, new Map());

    expect(value).toEqual(mockDimensionFilter);
  });
  it("Фильтр вне виджета, добавленный Картой процессов, проверяется Таблица", () => {
    const value = replaceFiltersBySelection(mockProcessFilter, new Map());

    expect(value).toEqual(mockProcessFilter);
  });
  it("Фильтр вне виджета, добавленный Воронкой, проверяется Таблица", () => {
    const value = replaceFiltersBySelection(mockStageFilter, new Map());

    expect(value).toEqual(mockStageFilter);
  });
});
