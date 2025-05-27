import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from 'react-native-elements';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const router = useRouter();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'produtos'));
        const produtosArray = [];
        querySnapshot.forEach((doc) => {
          produtosArray.push({ id: doc.id, ...doc.data() });
        });
        setProdutos(produtosArray);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0B1F3A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            router.dismissAll();
            router.replace('/');
          }}
        >
          <Icon name="arrow-back" type="material" color="#FFFFFF" />
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/ProfileScreen')}>
          <Text style={styles.headerButtonText}>Perfil</Text>
          <Icon name="account-circle" type="material" color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Produtos em Destaque</Text>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productContainer}
            onPress={() =>
              router.push({
                pathname: '/ProductDetails',
                params: {
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  description: item.description,
                  image: item.image,
                },
              })
            }
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>R$ {item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    zIndex: 1,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#003A84',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  headerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginHorizontal: 5,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0B1F3A',
    textAlign: 'center',
    marginVertical: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  productContainer: {
    backgroundColor: '#003A84',
    borderRadius: 16,
    padding: 12,
    width: screenWidth / 2 - 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 4,
  },
});

export default HomeScreen;
