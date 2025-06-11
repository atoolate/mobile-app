import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProductDetail from './screens/ProductDetail';
import ProductsScreen from './screens/ProductsScreen';
import BlogsScreen from './screens/BlogsScreen';
import ProfileScreen from './screens/ProfileScreen';
import WishlistScreen from './screens/WishlistScreen';
import CustomHeader from './components/CustomHeader';
import { useFonts, Inconsolata_400Regular, Inconsolata_700Bold } from '@expo-google-fonts/inconsolata';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Details" component={ProductDetail} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
    </Stack.Navigator>
  );
}

function ProductsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Products" 
        component={ProductsScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Details" component={ProductDetail} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
    </Stack.Navigator>
  );
}

const BlogsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Blogs" 
      component={BlogsScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen name="Wishlist" component={WishlistScreen} />
  </Stack.Navigator>
);



export default function App() {
  const [fontsLoaded] = useFonts({
    Inconsolata_400Regular,
    Inconsolata_700Bold,
  });
  if (!fontsLoaded) {
    return null; // or a loading indicator
  }
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="Products" 
          component={ProductsStack} 
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Blogs" 
          component={BlogsStack} 
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


