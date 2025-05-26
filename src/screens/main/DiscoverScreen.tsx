import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CATEGORIES = [
  {
    id: '1',
    title: 'Travel',
    icon: 'flight',
    color: '#FF6B6B',
    image: 'https://picsum.photos/500/300',
  },
  {
    id: '2',
    title: 'Food',
    icon: 'restaurant',
    color: '#4ECDC4',
    image: 'https://picsum.photos/500/301',
  },
  {
    id: '3',
    title: 'Fitness',
    icon: 'fitness-center',
    color: '#45B7D1',
    image: 'https://picsum.photos/500/302',
  },
];

const TRENDING = [
  {
    id: '1',
    title: 'Best Mountain Hikes',
    category: 'Travel',
    image: 'https://picsum.photos/500/303',
  },
  {
    id: '2',
    title: 'Healthy Recipes',
    category: 'Food',
    image: 'https://picsum.photos/500/304',
  },
];

const DiscoverScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, {backgroundColor: category.color}]}>
              <Icon name={category.icon} size={32} color="#fff" />
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trending Now</Text>
        {TRENDING.map(item => (
          <TouchableOpacity key={item.id} style={styles.trendingCard}>
            <ImageBackground
              source={{uri: item.image}}
              style={styles.trendingImage}
              imageStyle={styles.trendingImageStyle}>
              <View style={styles.trendingContent}>
                <Text style={styles.trendingCategory}>{item.category}</Text>
                <Text style={styles.trendingTitle}>{item.title}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  categoryCard: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  trendingCard: {
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  trendingImageStyle: {
    borderRadius: 12,
  },
  trendingContent: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  trendingCategory: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  trendingTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DiscoverScreen; 