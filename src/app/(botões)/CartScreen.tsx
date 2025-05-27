import React, { useCallback, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

export const options = {
  headerShown: false,
};

export default function CartScreen() {
  const router = useRouter();
  const modalizeRef = useRef<Modalize>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [cpf, setCpf] = useState('');

  const openModal = () => {
    modalizeRef.current?.open();
  };

  useFocusEffect(
    useCallback(() => {
      const loadCart = async () => {
        try {
          const storedCart = await AsyncStorage.getItem('cartItems');
          const parsed = storedCart ? JSON.parse(storedCart) : [];
          setCartItems(parsed);
        } catch (error) {
          console.log('Erro ao carregar carrinho:', error);
        }
      };

      loadCart();
    }, [])
  );

  const total = cartItems.reduce((sum: number, item: any) => {
    const num = parseFloat(item.price.replace(',', '.').replace(/[^\d.]/g, ''));
    return sum + num;
  }, 0);

  const handleClearCart = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
      setCartItems([]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível limpar o carrinho.');
    }
  };

  const handleConfirmPurchase = async () => {
    if (!name || !address || !cpf) {
      Alert.alert('Preencha todos os campos para finalizar a compra!');
      return;
    }

    Alert.alert(
      'Compra Confirmada ✅',
      `Obrigado pela compra, ${name}! 🎉`,
      [{ text: 'OK', onPress: () => modalizeRef.current?.close() }]
    );

    await handleClearCart();
    setName('');
    setAddress('');
    setCpf('');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name='arrow-back' type='material' color='#FFF' />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.title}>🛒 Carrinho</Text>

        {cartItems.length === 0 ? (
          <Text style={styles.empty}>Seu carrinho está vazio.</Text>
        ) : (
          <>
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                  </View>
                </View>
              )}
            />

            <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.buyButton, { backgroundColor: '#003A84' }]}
                onPress={openModal}
              >
                <Text style={styles.buyButtonText}>Finalizar Compra</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buyButton, { backgroundColor: 'crimson' }]}
                onPress={() =>
                  Alert.alert(
                    'Limpar carrinho',
                    'Tem certeza que deseja remover todos os itens?',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      { text: 'Confirmar', onPress: handleClearCart },
                    ]
                  )
                }
              >
                <Text style={styles.buyButtonText}>Limpar</Text>
              </TouchableOpacity>
            </View>

            <Modalize ref={modalizeRef} adjustToContentHeight>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Finalizar Compra</Text>

                <TextInput
                  placeholder="Nome Completo"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
                <TextInput
                  placeholder="Endereço"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                />
                <TextInput
                  placeholder="CPF"
                  placeholderTextColor="#999"
                  style={styles.input}
                  value={cpf}
                  onChangeText={setCpf}
                />

                <TouchableOpacity
                  style={[styles.buyButton, { backgroundColor: '#003A84', marginTop: 15 }]}
                  onPress={handleConfirmPurchase}
                >
                  <Text style={styles.buyButtonText}>Confirmar Compra</Text>
                </TouchableOpacity>
              </View>
            </Modalize>
          </>
        )}
      </View>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#003A84',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    color: '#0B1F3A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  empty: {
    color: '#9E9E9E',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 30,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0B1F3A',
  },
  price: {
    fontSize: 14,
    color: '#4B0082',
  },
  total: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#0B1F3A',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  buyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  modalContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003A84',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 10,
    fontSize: 16,
    color: '#000',
  },
});
