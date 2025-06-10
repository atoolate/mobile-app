import React from 'react';
import { Picker } from '@react-native-picker/picker';

const SortPicker = ({ sortOption, setSortOption, style }) => (
  <Picker
    selectedValue={sortOption}
    onValueChange={setSortOption}
    style={style}
  >
    <Picker.Item label="Price: Low to High" value="price-asc" />
    <Picker.Item label="Price: High to Low" value="price-desc" />
    <Picker.Item label="Name: A to Z" value="name-asc" />
    <Picker.Item label="Name: Z to A" value="name-desc" />
  </Picker>
);

export default SortPicker;
