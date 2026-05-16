export type ShipmentStatus = 'Pending' | 'Picked Up' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Delayed' | 'Exception' | 'On Hold' | 'Returned';

export interface StatusConfig {
  bg: string;
  text: string;
  border: string;
}

export const STATUS_CONFIGS: Record<string, StatusConfig> = {
  'pending': { bg: 'bg-amber-100 text-amber-900', text: 'text-amber-700', border: 'border-amber-500' },
  'picked up': { bg: 'bg-purple-100 text-purple-900', text: 'text-purple-700', border: 'border-purple-500' },
  'in transit': { bg: 'bg-blue-100 text-blue-900', text: 'text-blue-700', border: 'border-blue-500' },
  'out for delivery': { bg: 'bg-sky-100 text-sky-900', text: 'text-sky-700', border: 'border-sky-500' },
  'delivered': { bg: 'bg-orange-100 text-orange-900', text: 'text-orange-700', border: 'border-orange-500' },
  'delayed': { bg: 'bg-red-100 text-red-900', text: 'text-red-700', border: 'border-red-500' },
  'exception': { bg: 'bg-orange-100 text-orange-900', text: 'text-orange-700', border: 'border-orange-500' },
  'on hold': { bg: 'bg-yellow-100 text-yellow-900', text: 'text-yellow-700', border: 'border-yellow-500' },
  'returned': { bg: 'bg-gray-100 text-gray-900', text: 'text-gray-700', border: 'border-gray-500' },
};

export function getStatusConfig(status: string): StatusConfig {
  const key = status.toLowerCase();
  return STATUS_CONFIGS[key] || STATUS_CONFIGS['pending'];
}

export function getStatusBg(status: string): string { return getStatusConfig(status).bg; }
export function getStatusText(status: string): string { return getStatusConfig(status).text; }
export function getStatusBorder(status: string): string { return getStatusConfig(status).border; }

export function formatStatus(status: string): string {
  return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}