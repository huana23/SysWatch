export type MonitoringLevel = "normal" | "warning" | "critical" | "emergency";

export type MonitoringStatus = {
  level: MonitoringLevel;
  label: string;
  toneClassName: string;
  score: number;
  reasons: string[];
};

type SupportMonitoringInput = {
  totalTickets: number;
  resolvedTickets: number;
  inProgressTickets: number;
  overdueTickets: number;
  firstResponseRate: number;
  resolutionRate: number;
  criticalBreaches: number;
};

type PartnerMonitoringInput = {
  growthRate: number;
  slaAverage: number;
  avgProcessingHours: number;
  activePartnerRate: number;
};

type SystemHealthMonitoringInput = {
  cpuPercent: number;
  ramPercent: number;
  latencyMs: number;
  packetLossPercent: number;
};

const createStatus = (
  level: MonitoringLevel,
  reasons: string[],
  score: number,
): MonitoringStatus => {
  if (level === "normal") {
    return {
      level,
      label: "Bình thường",
      toneClassName:
        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300",
      score,
      reasons,
    };
  }

  if (level === "warning") {
    return {
      level,
      label: "Cảnh báo",
      toneClassName:
        "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
      score,
      reasons,
    };
  }

  if (level === "critical") {
    return {
      level,
      label: "Nguy cấp",
      toneClassName:
        "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300",
      score,
      reasons,
    };
  }

  return {
    level,
    label: "Khẩn cấp",
    toneClassName:
      "border-red-300 bg-red-50 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300",
    score,
    reasons,
  };
};

export const getSystemHealthMonitoringStatus = ({
  cpuPercent,
  ramPercent,
  latencyMs,
  packetLossPercent,
}: SystemHealthMonitoringInput): MonitoringStatus => {
  const reasons: string[] = [];

  if (cpuPercent >= 95 || ramPercent >= 95 || latencyMs >= 120 || packetLossPercent >= 1) {
    if (cpuPercent >= 95) reasons.push("CPU vượt 95%");
    if (ramPercent >= 95) reasons.push("RAM vượt 95%");
    if (latencyMs >= 120) reasons.push("Độ trễ hệ thống vượt 120ms");
    if (packetLossPercent >= 1) reasons.push("Tỉ lệ mất gói vượt 1%");
    return createStatus("emergency", reasons, 25);
  }

  if (cpuPercent >= 85 || ramPercent >= 88 || latencyMs >= 80 || packetLossPercent >= 0.5) {
    if (cpuPercent >= 85) reasons.push("CPU đang ở vùng tải cao");
    if (ramPercent >= 88) reasons.push("RAM gần đầy");
    if (latencyMs >= 80) reasons.push("Độ trễ hệ thống tăng cao");
    if (packetLossPercent >= 0.5) reasons.push("Mất gói ở mức đáng chú ý");
    return createStatus("critical", reasons, 45);
  }

  if (cpuPercent >= 70 || ramPercent >= 75 || latencyMs >= 40 || packetLossPercent >= 0.2) {
    if (cpuPercent >= 70) reasons.push("CPU bắt đầu tăng tải");
    if (ramPercent >= 75) reasons.push("RAM vào vùng cần theo dõi");
    if (latencyMs >= 40) reasons.push("Độ trễ cao hơn mức bình thường");
    if (packetLossPercent >= 0.2) reasons.push("Có dấu hiệu mất gói nhẹ");
    return createStatus("warning", reasons, 70);
  }

  return createStatus("normal", ["Các chỉ số hệ thống đang trong ngưỡng an toàn"], 92);
};

export const getSupportMonitoringStatus = ({
  totalTickets,
  resolvedTickets,
  inProgressTickets,
  overdueTickets,
  firstResponseRate,
  resolutionRate,
  criticalBreaches,
}: SupportMonitoringInput): MonitoringStatus => {
  const reasons: string[] = [];
  const safeTotal = Math.max(totalTickets, 1);

  const overdueRate = (overdueTickets / safeTotal) * 100;
  const backlogRate = (inProgressTickets / safeTotal) * 100;
  const resolvedRate = (resolvedTickets / safeTotal) * 100;

  if (
    overdueRate > 15 ||
    firstResponseRate < 80 ||
    resolutionRate < 75 ||
    backlogRate > 35 ||
    criticalBreaches >= 5
  ) {
    if (overdueRate > 15) reasons.push("Tỉ lệ quá hạn SLA vượt 15%");
    if (firstResponseRate < 80) reasons.push("First response rate dưới 80%");
    if (resolutionRate < 75) reasons.push("Resolution rate dưới 75%");
    if (backlogRate > 35) reasons.push("Tồn đọng ticket vượt 35%");
    if (criticalBreaches >= 5) reasons.push("Số ticket breach nghiêm trọng quá cao");
    return createStatus("emergency", reasons, 28);
  }

  if (
    overdueRate > 8 ||
    firstResponseRate < 90 ||
    resolutionRate < 85 ||
    backlogRate > 25 ||
    criticalBreaches >= 3
  ) {
    if (overdueRate > 8) reasons.push("Tỉ lệ quá hạn SLA đang cao");
    if (firstResponseRate < 90) reasons.push("First response rate giảm");
    if (resolutionRate < 85) reasons.push("Resolution rate thấp");
    if (backlogRate > 25) reasons.push("Backlog đang tăng");
    if (criticalBreaches >= 3) reasons.push("Có nhiều ticket breach nghiêm trọng");
    return createStatus("critical", reasons, 48);
  }

  if (
    overdueRate > 3 ||
    firstResponseRate < 95 ||
    resolutionRate < 92 ||
    backlogRate > 15 ||
    criticalBreaches >= 1 ||
    resolvedRate < 75
  ) {
    if (overdueRate > 3) reasons.push("Đã xuất hiện quá hạn SLA");
    if (firstResponseRate < 95) reasons.push("First response rate cần cải thiện");
    if (resolutionRate < 92) reasons.push("Resolution rate chưa tối ưu");
    if (backlogRate > 15) reasons.push("Khối lượng ticket đang xử lý hơi cao");
    if (criticalBreaches >= 1) reasons.push("Đã có ticket breach nghiêm trọng");
    if (resolvedRate < 75) reasons.push("Tỉ lệ đóng ticket chưa cao");
    return createStatus("warning", reasons, 72);
  }

  return createStatus("normal", ["SLA và backlog đang ở mức ổn định"], 90);
};

export const getPartnerMonitoringStatus = ({
  growthRate,
  slaAverage,
  avgProcessingHours,
  activePartnerRate,
}: PartnerMonitoringInput): MonitoringStatus => {
  const reasons: string[] = [];

  if (
    growthRate < -5 ||
    slaAverage < 80 ||
    avgProcessingHours > 36 ||
    activePartnerRate < 60
  ) {
    if (growthRate < -5) reasons.push("Tăng trưởng đối tác đang âm mạnh");
    if (slaAverage < 80) reasons.push("SLA trung bình dưới 80%");
    if (avgProcessingHours > 36) reasons.push("Thời gian xử lý quá cao");
    if (activePartnerRate < 60) reasons.push("Tỉ lệ đối tác hoạt động quá thấp");
    return createStatus("emergency", reasons, 30);
  }

  if (
    growthRate < 0 ||
    slaAverage < 90 ||
    avgProcessingHours > 24 ||
    activePartnerRate < 75
  ) {
    if (growthRate < 0) reasons.push("Tăng trưởng đang giảm");
    if (slaAverage < 90) reasons.push("SLA trung bình chưa đạt kỳ vọng");
    if (avgProcessingHours > 24) reasons.push("Thời gian xử lý còn chậm");
    if (activePartnerRate < 75) reasons.push("Tỉ lệ đối tác active thấp");
    return createStatus("critical", reasons, 50);
  }

  if (
    growthRate < 5 ||
    slaAverage < 95 ||
    avgProcessingHours > 16 ||
    activePartnerRate < 85
  ) {
    if (growthRate < 5) reasons.push("Tăng trưởng chưa mạnh");
    if (slaAverage < 95) reasons.push("SLA cần cải thiện thêm");
    if (avgProcessingHours > 16) reasons.push("Thời gian xử lý ở mức cần theo dõi");
    if (activePartnerRate < 85) reasons.push("Tỉ lệ đối tác active chưa tối ưu");
    return createStatus("warning", reasons, 74);
  }

  return createStatus("normal", ["Mạng lưới đối tác đang tăng trưởng và vận hành tốt"], 91);
};