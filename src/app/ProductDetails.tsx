import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert, Share } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Modalize } from 'react-native-modalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type ProductDetailsParams = {
  name?: string;
  price?: string;
  description?: string;
  image?: string;
};

const ProductDetails = () => {
  const params = useLocalSearchParams<ProductDetailsParams>();
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [userCpf, setUserCpf] = useState('');
  const [userCep, setUserCep] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const modalizeRef = useRef<Modalize>(null);

  const name = typeof params.name === 'string' ? params.name : '';
  const price = typeof params.price === 'string' ? params.price : '';
  const description = typeof params.description === 'string' ? params.description : '';
  const image = typeof params.image === 'string' ? params.image : '';

  if (!name || !price || !description || !image) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Erro ao carregar os detalhes do produto.</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/HomeScreen')}
        >
          <Text style={styles.backText}>Voltar para a página inicial</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const openModal = () => {
    modalizeRef.current?.open();
  };

  const closeModal = () => {
    modalizeRef.current?.close();
  };

  const handleSubmit = () => {
    if (!userName || !userCpf || !userCep || !userEmail || !userPhone) {
      Alert.alert('Erro', 'Todos os campos precisam ser preenchidos.');
      return;
    }

    Alert.alert(
      'Confirmar Compra',
      `Você deseja confirmar a compra de ${name} por ${price}?`,
      [
        {
          text: 'Cancelar',
          onPress: closeModal,
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            Alert.alert(
              'Compra Confirmada',
              `Compra de ${name} realizada com sucesso!\n\nValor: ${price}`,
              [{ text: 'OK', onPress: closeModal }],
              { cancelable: false }
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Confira este produto incrível!\n\n${name}\nPreço: ${price}\n\nDescrição: ${description}`,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar o produto.');
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>⬅ Voltar</Text>
        </TouchableOpacity>

        <Image source={{ uri: image }} style={styles.image} />
        
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.descriptionTitle}>Descrição</Text>
        </View>
        
        <Text style={styles.description}>{description}</Text>

        {/* Botões lado a lado */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buyButton} onPress={openModal}>
            <Text style={styles.buyButtonText}>🛒 Comprar Agora</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>📤 Compartilhar</Text>
          </TouchableOpacity>
        </View>

        <Modalize ref={modalizeRef} adjustToContentHeight>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Informações de Compra</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#888"
              value={userName}
              onChangeText={setUserName}
            />
            
            <TextInput
              style={styles.input}
              placeholder="CPF"
              placeholderTextColor="#888"
              value={userCpf}
              onChangeText={setUserCpf}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="CEP"
              placeholderTextColor="#888"
              value={userCep}
              onChangeText={setUserCep}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#888"
              value={userEmail}
              onChangeText={setUserEmail}
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="Telefone"
              placeholderTextColor="#888"
              value={userPhone}
              onChangeText={setUserPhone}
              keyboardType="phone-pad"
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Finalizar Compra</Text>
            </TouchableOpacity>
          </View>
        </Modalize>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090033',
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
    backgroundColor: '#4B0082',
    borderRadius: 5,
  },
  backText: {
    color: '#FFF',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: 60,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: '#DDD',
    marginTop: 5,
  },
  descriptionTitle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
    width: '100%',
  },
  buyButton: {
    flex: 1,
    backgroundColor: '#4B0082',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#6A0DAD',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4B0082',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 15,
    paddingLeft: 10,
    color: '#333',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#4B0082',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetails;
