export enum CounterStatus {
  NOT_STARTED = 'Not started',
  RUNNING = 'Running',
  STOPPED = 'Stopped',
  SAVED = 'Saved',
}

export type HistoryType = {
  id: number;
  date: string;
  history: string;
};
