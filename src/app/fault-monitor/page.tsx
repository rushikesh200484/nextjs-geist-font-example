'use client';

import { useState } from 'react';
import { FaultCard } from '@/components/fault-card';
import { RoomStatus } from '@/lib/fault-types';

export default function FaultMonitorPage() {
  const [rooms, setRooms] = useState<RoomStatus[]>([
    {
      id: 'room1',
      name: 'Living Room',
      status: 'normal',
      location: 'Ground Floor',
      mcbTrips: 0,
      lastFaultTime: undefined
    },
    {
      id: 'room2',
      name: 'Kitchen',
      status: 'normal',
      location: 'Ground Floor',
      mcbTrips: 0,
      lastFaultTime: undefined
    },
    {
      id: 'room3',
      name: 'Bedroom',
      status: 'normal',
      location: 'First Floor',
      mcbTrips: 0,
      lastFaultTime: undefined
    }
  ]);

  const handleAcknowledge = (roomId: string) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === roomId 
          ? { ...room, status: 'normal' }
          : room
      )
    );
  };

  const simulateFault = (roomId: string) => {
    setRooms(prevRooms => 
      prevRooms.map(room => 
        room.id === roomId 
          ? { 
              ...room, 
              status: 'fault', 
              lastFaultTime: new Date(),
              mcbTrips: room.mcbTrips + 1
            }
          : room
      )
    );
  };

  const getTotalFaults = () => rooms.filter(room => room.status === 'fault').length;
  const getTotalTrips = () => rooms.reduce((sum, room) => sum + room.mcbTrips, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Smart Fault Diagnosis Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor MCB status across 3 rooms with real-time updates
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Active Faults</h3>
            <div className="text-2xl font-bold text-red-600">{getTotalFaults()}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Trips</h3>
            <div className="text-2xl font-bold text-blue-600">{getTotalTrips()}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500 mb-2">System Status</h3>
            <div className="text-sm text-green-600 font-medium">Online</div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Room Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <FaultCard 
                key={room.id} 
                room={room} 
                onAcknowledge={handleAcknowledge}
              />
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">System Controls</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => simulateFault('room1')}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Simulate Living Room Fault
            </button>
            <button
              onClick={() => simulateFault('room2')}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Simulate Kitchen Fault
            </button>
            <button
              onClick={() => simulateFault('room3')}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Simulate Bedroom Fault
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
