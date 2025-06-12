import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import BlogRow from '../components/BlogRow';
import { BLOGS_API_URL, BEARER_TOKEN } from '@env';


const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
};

const BlogsScreen = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(BLOGS_API_URL, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.items && Array.isArray(data.items)) {
          setBlogs(data.items);
          setError(null);
        } else {
          console.log('Unexpected API response:', data);
          setError('Failed to load blogs.');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to load blogs.');
        setLoading(false);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Blogs</Text>

          {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />}
          {error && <Text style={styles.error}>{error}</Text>}
          {!loading && !error && blogs.length === 0 && (
            <Text style={styles.subtitle}>No blog posts found.</Text>
          )}

          {!loading && !error && blogs.map(blog => (
            <BlogRow
              key={blog.id}
              blog={blog}
              onPress={() => navigation.navigate('Blog Detail', { blog })}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    width: '100%',
    fontFamily: 'VarelaRound_400Regular',
    
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inconsolata_700Bold',
    marginBottom: 20,
    paddingBottom: 5,
    paddingLeft: 15,
    marginTop: 15,
    borderBottomColor: '#1a1a1a',
    borderBottomWidth: 1,

  },
  loading: {
    marginTop: 40,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default BlogsScreen;
