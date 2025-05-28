import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'New Message',
    description: 'You have a new message from John',
    time: '2m ago',
    icon: 'chat',
  },
  {
    id: '2',
    title: 'Friend Request',
    description: 'Sarah wants to connect with you',
    time: '1h ago',
    icon: 'person-add',
  },
  {
    id: '3',
    title: 'New Update',
    description: 'App version 2.0 is now available',
    time: '3h ago',
    icon: 'system-update',
  },
];

const NotificationsScreen = () => {
  const renderNotification = ({ item }: any) => (
    <View style={styles.notificationItem}>
      <Icon name={item.icon} size={24} color="#f4511e" style={styles.icon} />
      <View style={styles.notificationContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_NOTIFICATIONS}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});

export default NotificationsScreen;
