import { Tabs } from "expo-router/tabs";
import { Ionicons } from '@expo/vector-icons';

export function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: '#4B0082' }, // Cor de fundo
        tabBarActiveTintColor: 'white', // Ícone ativo
        tabBarInactiveTintColor: 'gray', // Ícone inativo
      }}
    >
      <Tabs.Screen 
        name="HomeScreen" 
        options={{
          tabBarLabel: "Início",
          tabBarIcon: (btn) => (
            <Ionicons 
              name={btn.focused ? "home" : "home-outline"} // Ícones dinâmicos
              size={20} 
              color={btn.focused ? 'white' : 'gray'} 
            />
          ),
          headerShown: false, // Remove o cabeçalho com o nome da tela
        }}
      />
      <Tabs.Screen 
        name="ProfileScreen" 
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: (btn) => (
            <Ionicons 
              name={btn.focused ? "person" : "person-outline"} // Ícones dinâmicos
              size={20} 
              color={btn.focused ? 'white' : 'gray'} 
            />
          ),
          headerShown: false, // Remove o cabeçalho com o nome da tela
        }}
      />
    </Tabs>
  );
}
export default Layout;