import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import api from '../services/Api';
import { color } from '../styles/Default';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import { convertToRupiah, convertDateIndonesia } from '../helper/Formaters';
import SortModal from '../components/SortModal';

export default class TransactionListScreen extends Component {
  constructor(props) {
    super(props);
    this.transactionDataHolder = []
    this.state = {
      transactionData: [],
      modalVisible: false,
      selectedSort: 0
    };
  }

  componentDidMount() {
    this.loadTransactions()
  }

  loadTransactions = async () => {
    await api.get(`frontend-test`).then(
      (res) => {
        this.transactionDataHolder = res.data
        this.setState({ transactionData: res.data })
      }
    )
  }

  searchTransaction = text => {
    Object.filter = (obj, predicate) => Object.fromEntries(Object.entries(obj).filter(predicate))
    const newData = Object.filter(this.transactionDataHolder, ([key, value]) => {
      const itemName = `${value.beneficiary_name.toUpperCase()}`;
      const itemSenderBank = `${value.sender_bank.toUpperCase()}`;
      const itemBeneficiaryBank = `${value.beneficiary_bank.toUpperCase()}`;
      const itemAmount = `${value.amount.toString().toUpperCase()}`;

      const textData = text.toUpperCase();

      return (
        itemName.indexOf(textData) > -1 ||
        itemSenderBank.indexOf(textData) > -1 ||
        itemBeneficiaryBank.indexOf(textData) > -1 ||
        itemAmount.indexOf(textData) > -1
      )

    })

    this.setState({ transactionData: newData });
  };

  sortTransaction(sortKey) {
    const data = Object.entries(this.transactionDataHolder)

    var newData = Object.fromEntries(data.sort(([key1, val1], [key2, val2]) => {
      const nameA = val1.beneficiary_name.toUpperCase();
      const nameB = val2.beneficiary_name.toUpperCase();
      const dateA = new Date(val1.created_at);
      const dateB = new Date(val2.created_at);

      if(sortKey == 0){
        return this.transactionDataHolder
      } else if (sortKey == 1) {
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
      } else if (sortKey == 2) {
        return (nameA > nameB) ? -1 : (nameA < nameB) ? 1 : 0;
      } else if (sortKey == 3) {
        return (dateA > dateB) ? -1 : (dateA < dateB) ? 1 : 0;
      } else {
        return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
      }
    }))

    this.setState({ transactionData: newData })
  }

  onPressCloseModal() {
    this.setState({ modalVisible: false })
  }

  onSelectSortKey(sortKey) {
    this.setState({ selectedSort: sortKey })
  }

  renderSortText() {
    if (this.state.selectedSort == 0) {
      return "URUTKAN"
    } else if (this.state.selectedSort == 1) {
      return "Nama A-Z"
    } else if (this.state.selectedSort == 2) {
      return "Nama Z-A"
    } else if (this.state.selectedSort == 3) {
      return "Terbaru"
    } else {
      return "Terlama"
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.Container}>
          <View style={{ padding: 10 }}>
            <View style={styles.SearchBar}>
              <View style={{ width: '10%' }}>
                <MaterialIcon name='search' size={25} color={color.grey} />
              </View>
              <TextInput
                style={{ flexWrap: 'wrap', height: 45, width: '60%' }}
                placeholder='Cari Nama, Bank atau Nominal'
                onChangeText={text => this.searchTransaction(text)}
              />

              <View style={{ height: 45, width: '30%', padding: 10, }}>
                <TouchableOpacity
                  style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}
                  onPress={() => this.setState({ modalVisible: true })}
                >
                  <Text style={{ color: color.orange, fontWeight: 'bold', textAlign: 'center' }}>{this.renderSortText()}</Text>
                  <MaterialIcon name='keyboard-arrow-down' size={25} color={color.orange} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <ScrollView contentContainerStyle={{ padding: 10, paddingBottom: 150, }}>
            {
              Object.entries(this.state.transactionData).map(([key, value]) => (
                <TouchableOpacity key={value.id} activeOpacity={0.7} onPress={() => this.props.navigation.push('TransactionDetail', { transactionData: this.transactionDataHolder, transactionId: value.id })}>
                  <View style={[styles.ItemContainer, { backgroundColor: value.status == 'PENDING' ? color.orange : color.green }]}>
                    <View style={{ width: '100%', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', padding: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                      <View style={{ width: '70%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{value.sender_bank.toUpperCase()}</Text>
                          <MaterialIcon name='arrow-forward' size={15} />
                          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{value.beneficiary_bank.toUpperCase()}</Text>
                        </View>
                        <Text style={{ fontSize: 15 }}>{value.beneficiary_name.toUpperCase()}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={{ fontSize: 15 }}>Rp{convertToRupiah(value.amount)}</Text>
                          <OcticonIcon name='primitive-dot' size={15} style={{ marginHorizontal: 3 }} />
                          <Text style={{ fontSize: 15 }}>{convertDateIndonesia(value.created_at)}</Text>
                        </View>
                      </View>
                      <View style={{
                        width: '30%',
                        padding: 5,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: value.status == 'PENDING' ? color.orange : color.green,
                        backgroundColor: value.status == 'PENDING' ? 'white' : color.green,
                      }}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center', color: value.status == 'PENDING' ? 'black' : 'white' }}>{value.status == 'PENDING' ? 'Pengecekan' : 'Berhasil'}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
          <SortModal
            modalVisible={this.state.modalVisible}
            onPressClose={this.onPressCloseModal.bind(this)}
            onSelectSort={this.onSelectSortKey.bind(this)}
            sortTransaction={this.sortTransaction.bind(this)}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
    backgroundColor: color.lightGrey
  },
  SearchBar: {
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  ItemContainer: {
    paddingLeft: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 10,
  }
})

