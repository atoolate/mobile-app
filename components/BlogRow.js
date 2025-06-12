import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
};

const BlogRow = ({ blog, onPress, style }) => {
  const field = blog.fieldData;
  let imageUrl = field["cover-image"]?.url;

  return (
    <TouchableOpacity style={[styles.blogRow, style]} onPress={onPress}>
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
};

const styles = StyleSheet.create({
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
    height: 100,
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
});

export default BlogRow;
