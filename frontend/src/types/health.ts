export type CpuDataPoint = {
  time: string;
  current: number;
  average: number;
};

export type RamDataPoint = {
  time: string;
  used: number;
};

export type BandwidthDataPoint = {
  name: string;
  value: number;
};