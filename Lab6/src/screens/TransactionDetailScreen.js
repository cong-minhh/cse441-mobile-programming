import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {styles} from '../styles/styles';

const TransactionDetailScreen = ({route}) => {
  const {transaction} = route.params;

  const formatDate = dateString => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}/${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView style={styles.transactionDetailContainer}>
      <View style={styles.transactionDetailSection}>
        <Text style={styles.transactionDetailSectionTitle}>
          General information
        </Text>
        <View style={styles.transactionDetailInfoRow}>
          <Text style={styles.transactionDetailLabel}>Transaction code</Text>
          <Text style={styles.transactionDetailValue}>{transaction.id}</Text>
        </View>
        <View style={styles.transactionDetailInfoRow}>
          <Text style={styles.transactionDetailLabel}>Customer</Text>
          <Text style={styles.transactionDetailValue}>
            {transaction.customer?.name || 'Unknown'}
          </Text>
        </View>
        <View style={styles.transactionDetailInfoRow}>
          <Text style={styles.transactionDetailLabel}>Creation time</Text>
          <Text style={styles.transactionDetailValue}>
            {formatDate(transaction.createdAt)}
          </Text>
        </View>
      </View>

      <View style={styles.transactionDetailSection}>
        <Text style={styles.transactionDetailSectionTitle}>Services list</Text>
        {transaction.services.map((service, index) => (
          <View key={index} style={styles.transactionDetailServiceRow}>
            <View style={styles.transactionDetailServiceInfo}>
              <Text style={styles.transactionDetailServiceName}>
                {service.name}
              </Text>
              <Text style={styles.transactionDetailServiceQuantity}>
                x{service.quantity || 1}
              </Text>
            </View>
            <Text style={styles.transactionDetailServicePrice}>
              {Number(service.price).toLocaleString('vi-VN')} đ
            </Text>
          </View>
        ))}
        <View style={styles.transactionDetailTotalRow}>
          <Text style={styles.transactionDetailLabel}>Total</Text>
          <Text style={styles.transactionDetailTotalAmount}>
            {Number(transaction.priceBeforePromotion).toLocaleString('vi-VN')} đ
          </Text>
        </View>
      </View>

      <View style={styles.transactionDetailSection}>
        <Text style={styles.transactionDetailSectionTitle}>Cost</Text>
        <View style={styles.transactionDetailInfoRow}>
          <Text style={styles.transactionDetailLabel}>Amount of money</Text>
          <Text style={styles.transactionDetailValue}>
            {Number(transaction.priceBeforePromotion).toLocaleString('vi-VN')} đ
          </Text>
        </View>
        <View style={styles.transactionDetailInfoRow}>
          <Text style={styles.transactionDetailLabel}>Discount</Text>
          <Text style={styles.transactionDetailDiscountValue}>
            -
            {Number(
              transaction.priceBeforePromotion - transaction.price || 0,
            ).toLocaleString('vi-VN')}{' '}
            đ
          </Text>
        </View>
        <View style={styles.transactionDetailTotalPaymentRow}>
          <Text style={styles.transactionDetailLabel}>Total payment</Text>
          <Text style={styles.transactionDetailTotalPayment}>
            {Number(transaction.price).toLocaleString('vi-VN')} đ
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TransactionDetailScreen;
