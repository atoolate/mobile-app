import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader';
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

          {!loading && !error && blogs.map(blog => {
            const field = blog.fieldData;
            let imageUrl = field["cover-image"]?.url;

            return (
              <TouchableOpacity
                key={blog.id}
                style={styles.blogRow}
                onPress={() => navigation.navigate('Details', { blog })}
              >
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
  blogRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    borderBottomColor: '#1a1a1a',
    borderBottomWidth: 1,
  },
  blogImageRow: {
    width: 100,
    height: '100%',
    aspectRatio: 1,
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
    fontFamily: 'Inconsolata_700Bold',
    marginBottom: 3,
  },
  blogDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 6,
    fontFamily: 'VarelaRound_400Regular',
  },
  blogIntro: {
    fontSize: 16,
    color: '#333',
  },
});

export default BlogsScreen;
