import { Tabs } from "expo-router/tabs";
import { Ionicons } from '@expo/vector-icons';

export function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: '#4B0082' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen 
        name="HomeScreen" 
        options={{
          tabBarLabel: "Início",
          tabBarIcon: (btn) => (
            <Ionicons 
              name={btn.focused ? "home" : "home-outline"} 
              size={20} 
              color={btn.focused ? 'white' : 'gray'} 
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen 
        name="CartScreen" 
        options={{
          tabBarLabel: "Carrinho",
          tabBarIcon: (btn) => (
            <Ionicons 
              name={btn.focused ? "cart" : "cart-outline"}
              size={20}
              color={btn.focused ? 'white' : 'gray'}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen 
        name="ProfileScreen" 
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: (btn) => (
            <Ionicons 
              name={btn.focused ? "person" : "person-outline"} 
              size={20} 
              color={btn.focused ? 'white' : 'gray'} 
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

export default Layout;
