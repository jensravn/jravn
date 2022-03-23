import DateRange from "../dateRange/dateRange";
import styles from "./dateRanges.module.css";

export type DateRangeType = {
  name: string;
  start?: Date;
  end?: Date;
};

type Props = { dateRanges: DateRangeType[] };

const MAX_POINT = 100;

const DateRanges = ({ dateRanges }: Props) => {
  const epochs = [
    ...dateRanges.map((x) => x.start?.getTime()),
    ...dateRanges.map((x) => x.end?.getTime()),
  ].filter((x) => x !== undefined) as number[];

  const min = Math.min(...epochs);
  const max = Math.max(...epochs);

  const epochPoint = (epoch?: number) => {
    return epoch
      ? Math.floor(((epoch - min) / (max - min)) * MAX_POINT)
      : undefined;
  };

  return (
    <div className={styles.dateRange}>
      {dateRanges.map((dateRange, i) => (
        <div key={i}>
          <DateRange
            name={dateRange.name}
            startDate={dateRange.start}
            endDate={dateRange.end}
            startPoint={epochPoint(dateRange.start?.getTime())}
            endPoint={epochPoint(dateRange.end?.getTime())}
            size={MAX_POINT}
          />
        </div>
      ))}
    </div>
  );
};

export default DateRanges;
