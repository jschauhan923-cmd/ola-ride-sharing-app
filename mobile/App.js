import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timezones, setTimezones] = useState([
    { name: 'IST (India)', offset: 5.5 },
    { name: 'UTC', offset: 0 },
    { name: 'EST (New York)', offset: -5 },
    { name: 'PST (Los Angeles)', offset: -8 },
    { name: 'GMT (London)', offset: 0 },
    { name: 'JST (Tokyo)', offset: 9 },
    { name: 'AEST (Sydney)', offset: 10 }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeInTimezone = (offset) => {
    const date = new Date(currentTime.getTime() + offset * 60 * 60 * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  const renderClockItem = ({ item }) => (
    <View style={styles.clockItem}>
      <Text style={styles.timezoneName}>{item.name}</Text>
      <Text style={styles.timeDisplay}>{getTimeInTimezone(item.offset)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🚗 Ola Ride-Sharing App 🏍️</Text>
      <Text style={styles.subHeader}>Digital Clock - Multiple Time Zones</Text>
      
      <FlatList
        data={timezones}
        renderItem={renderClockItem}
        keyExtractor={(item) => item.name}
        scrollEnabled={false}
        contentContainerStyle={styles.clockList}
      />
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Bike & Car Ride-Sharing Platform</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  clockList: {
    paddingBottom: 20,
  },
  clockItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  timezoneName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timeDisplay: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B35',
    fontFamily: 'monospace',
  },
  footer: {
    marginTop: 30,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },
});

export default App;
