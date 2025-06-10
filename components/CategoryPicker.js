import React from 'react';
import { Picker } from '@react-native-picker/picker';

const CategoryPicker = ({ selectedCategory, setSelectedCategory, categories, style }) => (
  <Picker
    selectedValue={selectedCategory}
    onValueChange={setSelectedCategory}
    style={style}
  >
    <Picker.Item label="All" value="" />
    {categories.map(category => (
      <Picker.Item key={category} label={category} value={category} />
    ))}
  </Picker>
);

export default CategoryPicker;
