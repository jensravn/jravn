type Props = {
  name: string;
  startDate?: Date;
  endDate?: Date;
  startPoint?: number;
  endPoint?: number;
  size: number;
};

const EMPTY_DATE = "___null___";

const DateRange = ({
  name,
  startDate,
  endDate,
  startPoint,
  endPoint,
  size,
}: Props) => {
  const toChar = (iterator: number) => {
    if (startPoint === undefined && endPoint === undefined) {
      return "\u00A0";
    } else if (startPoint !== undefined && startPoint === iterator) {
      return ">";
    } else if (endPoint !== undefined && endPoint === iterator) {
      return "<";
    } else if (
      (startPoint === undefined || startPoint < iterator) &&
      (endPoint === undefined || endPoint > iterator)
    ) {
      return "_";
    } else {
      return "\u00A0";
    }
  };

  return (
    <code>
      {Array.from({ length: 20 }).map((_, i) => name[i] ?? "\u00A0")}{" "}
      {(startDate?.toISOString() ?? EMPTY_DATE).substring(0, 10)}{" "}
      {Array.from({ length: size + 5 }).map((_, i) => toChar(i - 2))}{" "}
      {(endDate?.toISOString() ?? EMPTY_DATE).substring(0, 10)}
    </code>
  );
};

export default DateRange;
