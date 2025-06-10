import React from 'react';
import { View, StyleSheet } from 'react-native';
import CategoryPicker from './CategoryPicker';
import SortPicker from './SortPicker';

const FilterBox = ({
  selectedCategory,
  setSelectedCategory,
  categories,
  sortOption,
  setSortOption,
  pickerStyle,
  style
}) => (
  <View style={[styles.filterbox, style]}>
    <CategoryPicker
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      categories={categories}
      style={pickerStyle}
    />
    <SortPicker
      sortOption={sortOption}
      setSortOption={setSortOption}
      style={pickerStyle}
    />
  </View>
);

const styles = StyleSheet.create({
  filterbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default FilterBox;
