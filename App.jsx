// File: App.jsx
// Created: 2026-04-14

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, NativeModules, PermissionsAndroid, Platform } from 'react-native';

const { PocoNotificationBacklight } = NativeModules;

export default function App() {
  const [activeColor, setActiveColor] = useState('None');

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const triggerColor = (name, hex) => {
    PocoNotificationBacklight.triggerLight(hex, name);
    setActiveColor(name);
  };

  const turnOff = () => {
    PocoNotificationBacklight.clearLight();
    setActiveColor('Off');
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="text-2xl font-bold text-white mb-8">
        POCO X8 Pro Max Notification LED
      </Text>
      
      <Text className="text-gray-400 mb-2">Active Target: {activeColor}</Text>
      <Text className="text-yellow-500 mb-8 text-xs px-8 text-center">
        *Lock the device screen immediately after pressing a color to trigger the hardware LEDs.
      </Text>

      <View className="flex-row space-x-4">
        <TouchableOpacity 
          className="bg-red-500 px-6 py-3 rounded-lg"
          onPress={() => triggerColor('Red', '#FF0000')}
        >
          <Text className="text-white font-semibold">Red</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-green-500 px-6 py-3 rounded-lg"
          onPress={() => triggerColor('Green', '#00FF00')}
        >
          <Text className="text-white font-semibold">Green</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="bg-blue-500 px-6 py-3 rounded-lg"
          onPress={() => triggerColor('Blue', '#0000FF')}
        >
          <Text className="text-white font-semibold">Blue</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        className="mt-8 bg-gray-700 px-8 py-4 rounded-full border border-gray-600"
        onPress={turnOff}
      >
        <Text className="text-gray-300 font-bold">Clear Notification</Text>
      </TouchableOpacity>
    </View>
  );
}
