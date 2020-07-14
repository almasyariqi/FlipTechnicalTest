import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { color } from '../styles/Default';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { convertDateIndonesia, convertToRupiah } from '../helper/Formaters';
import { Clipboard } from "@react-native-community/clipboard";

export default class TransactionDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionDetail: this.props.navigation.state.params.transactionData,
      transactionId: this.props.navigation.state.params.transactionId,
    };
  }

  componentDidMount() {
    Object.filter = (obj, predicate) => Object.fromEntries(Object.entries(obj).filter(predicate))
    const newData = Object.filter(this.state.transactionDetail, ([key, value]) => {
      const itemId = value.id

      return itemId.includes(this.state.transactionId)
    })

    this.setState({ transactionDetail: newData })
  } 

  render() {
    return (
      <SafeAreaView>
        <View style={styles.Container}>
          {
            Object.entries(this.state.transactionDetail).map(([key, value]) => (
              <View key={value.id} style={{ padding: 20 }}>
                <View style={{ paddingVertical: 15, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15, marginRight: 10 }}>ID TRANSAKSI: #{value.id}</Text>
                  <TouchableOpacity>
                    <MaterialIcon name='content-copy' size={20} color={color.orange} />
                  </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: color.grey, }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15, marginRight: 10 }}>DETAIL TRANSAKSI</Text>
                  <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                    <Text style={{ fontSize: 15, color: color.orange }}>Tutup</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 15, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{value.sender_bank.toUpperCase()}</Text>
                  <MaterialIcon name='arrow-forward' size={20} />
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{value.beneficiary_bank.toUpperCase()}</Text>
                </View>
                <View style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'flex-start'}}>
                  <View style={{ marginRight: 50 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{value.beneficiary_name.toUpperCase()}</Text>
                    <Text style={{ fontSize: 15, marginBottom: 15 }}>{value.account_number}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>BERITA TRANSFER</Text>
                    <Text style={{ fontSize: 15, marginBottom: 15 }}>{value.remark}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>WAKTU DIBUAT</Text>
                    <Text style={{ fontSize: 15 }}>{convertDateIndonesia(value.created_at)}</Text>
                  </View>
                  <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>NOMINAL</Text>
                    <Text style={{ fontSize: 15, marginBottom: 15 }}>Rp{convertToRupiah(value.amount)}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>KODE UNIK</Text>
                    <Text style={{ fontSize: 15 }}>{value.unique_code}</Text>
                  </View>
                </View>
              </View>
            ))
          }
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white'
  }
})