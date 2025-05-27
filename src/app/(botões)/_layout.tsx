import { Tabs } from "expo-router/tabs";
import { Ionicons } from '@expo/vector-icons';

export function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E0E0E0',
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#0B1F3A',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen 
        name="HomeScreen" 
        options={{
          tabBarLabel: "Início",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={size} 
              color={color} 
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen 
        name="CartScreen" 
        options={{
          tabBarLabel: "Carrinho",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? "cart" : "cart-outline"} 
              size={size} 
              color={color} 
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen 
        name="ProfileScreen" 
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={size} 
              color={color} 
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

export default Layout;
