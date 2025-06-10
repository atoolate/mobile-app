import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { BEARER_TOKEN } from '@env';

const BLOGS_API_URL = 'https://api.webflow.com/v2/sites/67ac9affa35b531aef6db98b/collections/67b74d23c5bbcd305c0ff100/items';

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
        'accept-version': '2.0.0'
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

          {!loading && !error && blogs.map(blog => {
            const field = blog.fieldData;
            let imageUrl = field["cover-image"]?.url;

            return (
              <TouchableOpacity key={blog.id} style={styles.blogRow}>
                {imageUrl ? (
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.blogImageRow}
                    onError={() => console.log('Image failed to load:', imageUrl)}
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>No Image</Text>
                  </View>
                )}
                <View style={styles.blogTextCol}>
                  <Text style={styles.blogTitle}>{field.name}</Text>
                  <Text style={styles.blogDate}>{formatDate(field['publication-date'])}</Text>
                  <Text style={styles.blogIntro}>{field.intro || 'No summary available.'}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
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
    backgroundColor: '#fff',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
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
  blogRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  blogImageRow: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 12,
  },
  blogTextCol: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  blogDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
  },
  blogIntro: {
    fontSize: 16,
    color: '#333',
  },
});

export default BlogsScreen;
