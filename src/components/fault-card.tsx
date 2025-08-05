'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Wifi, Smartphone } from 'lucide-react';
import { RoomStatus } from '@/lib/fault-types';

interface FaultCardProps {
  room: RoomStatus;
  onAcknowledge?: (roomId: string) => void;
}

export function FaultCard({ room, onAcknowledge }: FaultCardProps) {
  const [isAcknowledged, setIsAcknowledged] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'fault': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return 'Normal';
      case 'fault': return 'Fault Detected';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  const handleAcknowledge = () => {
    setIsAcknowledged(true);
    onAcknowledge?.(room.id);
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">
          {room.name}
        </CardTitle>
        <div className={`h-3 w-3 rounded-full ${getStatusColor(room.status)}`} />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge 
              variant={room.status === 'fault' ? 'destructive' : 'default'}
              className="text-xs"
            >
              {getStatusText(room.status)}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="text-sm font-medium">{room.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Trips</span>
            <span className="text-sm font-medium">{room.mcbTrips}</span>
          </div>

          {room.lastFaultTime && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Fault</span>
              <span className="text-sm font-medium">
                {new Date(room.lastFaultTime).toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Communication</span>
            <div className="flex gap-2">
              <Wifi className="h-4 w-4 text-blue-500" />
              <Smartphone className="h-4 w-4 text-green-500" />
            </div>
          </div>

          {room.status === 'fault' && !isAcknowledged && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleAcknowledge}
              className="w-full"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Acknowledge Fault
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
