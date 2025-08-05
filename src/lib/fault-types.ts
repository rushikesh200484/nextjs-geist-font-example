export interface RoomStatus {
  id: string;
  name: string;
  status: 'normal' | 'fault' | 'offline';
  lastFaultTime?: Date;
  mcbTrips: number;
  location: string;
}

export interface FaultAlert {
  id: string;
  roomId: string;
  roomName: string;
  timestamp: Date;
  type: 'wifi' | 'gsm';
  message: string;
  acknowledged: boolean;
}

export interface SystemConfig {
  wifiEnabled: boolean;
  gsmEnabled: boolean;
  notificationNumbers: string[];
  refreshInterval: number;
}
