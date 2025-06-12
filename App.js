import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProductDetail from './screens/ProductDetail';
import ProductsScreen from './screens/ProductsScreen';
import BlogsScreen from './screens/BlogsScreen';
import WishlistScreen from './screens/WishlistScreen';
import BlogDetail from './screens/BlogDetail';
import CustomHeader from './components/CustomHeader';
import { useFonts, Inconsolata_400Regular, Inconsolata_700Bold } from '@expo-google-fonts/inconsolata';
import { VarelaRound_400Regular } from '@expo-google-fonts/varela-round/400Regular';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import ChatbotScreen from './screens/ChatbotScreen';


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
      <Stack.Screen name="Product Detail" component={ProductDetail} />
      <Stack.Screen name="Blog Detail" component={BlogDetail} />
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
      <Stack.Screen name="Product Detail" component={ProductDetail} />
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
    <Stack.Screen name="Blog Detail" component={BlogDetail} />
    <Stack.Screen name="Wishlist" component={WishlistScreen} />
    <Stack.Screen name="Product Detail" component={ProductDetail} />
  </Stack.Navigator>
);

const ChatbotStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Chatbot" 
      component={ChatbotScreen} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen name="Wishlist" component={WishlistScreen} />
    <Stack.Screen name="Product Detail" component={ProductDetail} />
  </Stack.Navigator>
);


export default function App() {
  const [fontsLoaded] = useFonts({
    Inconsolata_400Regular,
    Inconsolata_700Bold,
    VarelaRound_400Regular,
  });
  if (!fontsLoaded) {
    return null; // or a loading indicator
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const iconSize = size - 4; // Make icon one size smaller
            if (route.name === 'Home') {
              return <AntDesign name="home" size={iconSize} color={color} />;
            }
            if (route.name === 'Products') {
              return <Feather name="shopping-cart" size={iconSize} color={color} />;
            }
            if (route.name === 'Blogs') {
              return <MaterialIcons name="article" size={iconSize} color={color} />;
            }
            if (route.name === 'Chatbot') {
                return <AntDesign name="wechat" size={iconSize} color={color} />;
            }
            return null;
          },
          tabBarLabelStyle: {
            fontFamily: 'Inconsolata_400Regular',
            fontSize: 13,
          },
          tabBarActiveTintColor: '#007aff',
          tabBarInactiveTintColor: '#333',
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: '#1a1a1a',
            backgroundColor: '#fff',
            borderTopStyle: 'solid',
            elevation: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.08,
            shadowRadius: 2,
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
        />
        <Tab.Screen 
          name="Products" 
          component={ProductsStack} 
        />
        <Tab.Screen 
          name="Blogs" 
          component={BlogsStack} 
        />
        <Tab.Screen
          name="Chatbot" 
          component={ChatbotStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


