import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { color } from '../styles/Default';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class SortModal extends Component {
  constructor(props) {
    super(props);
    this.onPressClose = this.onPressClose.bind(this)
    this.onSelectSort = this.onSelectSort.bind(this)
    this.sortTransaction = this.sortTransaction.bind(this)
    this.state = {
      sortData: ['URUTKAN', 'Nama A-Z', 'Nama Z-A', 'Tanggal Terbaru', 'Tanggal Terlama'],
      checked: 0
    };
  }

  onPressClose() {
    this.props.onPressClose()
  }

  radioButton(key, checked) {
    return (
      <View style={{
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: color.orange,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
      }}>
        {
          key == checked ?
            <View style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: color.orange,
            }} />
            : null
        }
      </View>
    );
  }

  onSelectSort(sortKey) {
    this.props.onSelectSort(sortKey)
  }

  sortTransaction(sortKey) {
    this.props.sortTransaction(sortKey)
  }

  render() {
    const { modalVisible } = this.props
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.Container}>
          <View style={styles.ModalView}>
            {
              this.state.sortData.map((item, key) => (
                <TouchableOpacity onPress={() => {
                  this.setState({ checked: key })
                  this.onSelectSort(key)
                  this.sortTransaction(key)
                  this.onPressClose()
                }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                    {
                      this.radioButton(key, this.state.checked)
                    }
                    <Text style={{ fontSize: 20 }}>{item}</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  ModalView: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
})
