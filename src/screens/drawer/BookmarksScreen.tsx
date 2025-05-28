import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MOCK_BOOKMARKS = [
  {
    id: '1',
    title: 'Travel Guide',
    category: 'Travel',
    icon: 'flight',
  },
  {
    id: '2',
    title: 'Recipes Collection',
    category: 'Food',
    icon: 'restaurant',
  },
  {
    id: '3',
    title: 'Workout Plan',
    category: 'Fitness',
    icon: 'fitness-center',
  },
  {
    id: '4',
    title: 'Reading List',
    category: 'Books',
    icon: 'book',
  },
  {
    id: '5',
    title: 'Movie Watchlist',
    category: 'Entertainment',
    icon: 'movie',
  },
  {
    id: '6',
    title: 'Shopping List',
    category: 'Shopping',
    icon: 'shopping-cart',
  },
];

const BookmarksScreen = () => {
  const renderBookmark = ({ item }: any) => (
    <TouchableOpacity style={styles.bookmarkItem}>
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={32} color="#fff" />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.category}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_BOOKMARKS}
        renderItem={renderBookmark}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
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
  columnWrapper: {
    justifyContent: 'space-between',
  },
  bookmarkItem: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f4511e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  category: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default BookmarksScreen;
