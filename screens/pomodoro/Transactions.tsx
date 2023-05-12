import React, { FunctionComponent, useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, TextInput, TouchableOpacity, ImageSourcePropType, Image, Button, Dimensions, ScrollView } from 'react-native';
import { Modal } from "./Modal";
type Data = {
  image: ImageSourcePropType
}
const Add: Data = {
  image: require('../../assets/add.png'),
}
function Transactions({ route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [cash, setCash] = useState<{ date: string, category: string, amount: number }[]>([]);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const getCash = () => {
    const newCash = [...cash, { date, category, amount: Number(amount) }];
    setCash(newCash);
  };
  const handleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (

    <View style={{ backgroundColor: 'white' }}>
      <ScrollView>
        <Text style={{ fontWeight: 'bold', fontSize: 30, textAlign: 'center', marginTop: 20, marginBottom: 30, color: 'black' }}>Transactions</Text>
        <View>
        </View>

        <View>
          <TouchableOpacity style={{ backgroundColor: '#F6D2F3', height: 55, marginTop: 10, marginHorizontal: 20, borderRadius: 10, borderWidth: 1 }} onPress={handleModal}>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <Text style={{ textAlign: 'center', fontSize: 25, color: 'black', fontWeight: '600', marginLeft: 50 }}>Add transcation</Text>
              <Image source={Add.image} style={{ width: 30, height: 30, marginLeft: 20, backgroundColor: '#F6D2F3', marginTop: 5, borderColor: 'black', borderWidth: 2, borderRadius: 50 }} />
            </View>
          </TouchableOpacity>
          {cash !== undefined ? (
            <View>
              {cash.map((transaction, index) => (
                <View>
                  <View key={index}>
                    <View style={{ marginTop: 30, flexDirection: 'column', borderWidth: 2, borderColor: 'black', backgroundColor: 'white', height: 70, marginHorizontal: 10 }}>
                      <View><Text style={{ position: 'absolute', right: 10, color: 'red', fontSize: 20, marginTop: 5 }}>{transaction.amount}</Text></View>
                      <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ marginLeft: 5 }}>
                          <Text style={{ fontSize: 18, color: 'black' }}>{transaction.category}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end', position: 'absolute', right: 10, top: 30 }}>
                          <Text style={{ fontSize: 18, fontWeight: 'bold', alignItems: 'flex-end', color: 'black' }}>{transaction.date}</Text>
                        </View>
                      </View>
                    </View>

                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View>

            </View>
          )}
          {route.params!== undefined ? (
            <View>
              {route.params.map((transaction: { amount: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; date: { toLocaleDateString: () => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }; }, index: React.Key | null | undefined) => (
                <View key={index}>
                  <View style={{ marginTop: 30, flexDirection: 'column', borderWidth: 2, borderColor: 'black', backgroundColor: 'white', height: 70, marginHorizontal: 10 }}>
                    <View><Text style={{ position: 'absolute', right: 10, color: 'red', fontSize: 20, marginTop: 5 }}>Rs. {transaction.amount}</Text></View>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                      <View style={{ marginLeft: 5 }}>
                        <Text style={{ fontSize: 18, color: 'black' }}>on {transaction.category}</Text>
                      </View>
                      <View style={{ alignItems: 'flex-end', position: 'absolute', right: 10, top: 30 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', alignItems: 'flex-end', color: 'black' }}>{transaction.date.toLocaleDateString()}</Text>
                      </View>
                    </View>
                  </View>

                </View>
              ))}
            </View>) : (
            <View></View>
          )}
          <Modal isVisible={modalVisible}>
            <Modal.Container>
              <Modal.Header title="Transaction" />
              <Modal.Body>
                <View >
                  <Text style={{ color: 'black', fontSize: 17, marginTop: 10 }}>Category</Text>
                  <TextInput value={category} onChangeText={setCategory} style={{ borderColor: 'black', borderWidth: 1, marginTop: 10, color: 'black' }} />

                  <Text style={{ color: 'black', fontSize: 17, marginTop: 20 }}>Amount</Text>
                  <TextInput value={amount} onChangeText={setAmount} style={{ borderColor: 'black', borderWidth: 1, marginTop: 10, color: 'black' }} />

                  <Text style={{ color: 'black', fontSize: 17, marginTop: 20 }}>Date</Text>
                  <TextInput value={date} onChangeText={setDate} style={{ borderColor: 'black', borderWidth: 1, marginTop: 10, marginBottom: 30, color: 'black' }} />
                  <View style={{ flexDirection: 'row' }}></View>
                </View>
              </Modal.Body>
              <Modal.Footer>
                <Button title="Add Transactions" onPress={() => { getCash(), setModalVisible(!modalVisible) }} />
              </Modal.Footer>
            </Modal.Container>
          </Modal>

        </View>
      </ScrollView>
    </View>
  )

}
export default Transactions;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#F4E6E6',
    borderColor: 'black',
    borderWidth: 1,
    // set elements horizontally, try column.  
  },
  container2: {
    flexDirection: 'row',
    // set elements horizontally, try column.  
  },
  rounded: {
    width: 160,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: '#B7E4EA',
    marginTop: '6%',
    alignSelf: 'center',
    borderWidth: 1
  },
  container4: {
    marginTop: 30,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#B7E4EA',
    height: 50,
    marginHorizontal: 20,
    borderRadius: 10
    // set elements horizontally, try column.  
  },
})

