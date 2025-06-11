import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import RenderHtml from 'react-native-render-html';

const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
};

const BlogDetail = ({ route, navigation }) => {
  const { blog } = route.params;
  const field = blog.fieldData;
  let imageUrl = field["cover-image"]?.url || (Array.isArray(field["cover-image"]) && field["cover-image"][0]?.url) || null;
  const { width } = useWindowDimensions();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.title}>{field.name}</Text>
          <Text style={styles.blogDate}>{formatDate(field['publication-date'])}</Text>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.blogImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}

          <Text style={styles.blogIntro}>{field.intro}</Text>

          {field['blog-content'] && (
            <RenderHtml
              source={{ html: field['blog-content'] }}
              contentWidth={width}
              baseStyle={{
                fontFamily: 'VarelaRound_400Regular',
                color: '#222',
                fontSize: 16,
                paddingLeft: 15,
                paddingRight: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#1a1a1a',
                paddingBottom: 15,
              }}
            />
          )}
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
    backgroundColor: '#fff',
    borderColor: '#1a1a1a',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inconsolata_700Bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#222',
    borderBottomColor: '#1a1a1a',
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  blogDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    fontFamily: 'VarelaRound_400Regular',
    paddingLeft: 15,
    paddingRight: 15,
  },
  blogImage: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    resizeMode: 'cover',
    
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 14,
  },
  blogIntro: {
    fontSize: 18,
    color: '#333',
    fontFamily: 'Inconsolata_700Bold',
    textAlign: 'center',
    marginBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default BlogDetail;
