import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // Common styles
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 24,
  },

  // Login Screen
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  logo: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#EF506B',
    marginBottom: 16,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 56,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  inputIcon: {
    padding: 12,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#202124',
  },
  passwordToggle: {
    padding: 12,
  },
  button: {
    backgroundColor: '#EF506B',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#dadce0',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // Services List
  servicesList: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 8,
  },
  cardPrice: {
    fontSize: 20,
    color: '#EF506B',
    fontWeight: '700',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EF506B',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  fabText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '400',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    color: '#5f6368',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: '#80868b',
    textAlign: 'center',
  },

  // Form Screens
  formScreen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  formHeader: {
    marginBottom: 32,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 16,
    color: '#5f6368',
  },
  formGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#202124',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputHelper: {
    fontSize: 14,
    color: '#5f6368',
    marginTop: 4,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  inputIcon: {
    padding: 12,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#202124',
  },
  formButton: {
    backgroundColor: '#EF506B',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  formButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  dangerButton: {
    backgroundColor: '#dc3545',
  },

  // Detail Screens
  detailContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  detailHeader: {
    marginBottom: 24,
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 8,
  },
  detailSubtitle: {
    fontSize: 18,
    color: '#5f6368',
    marginTop: 4,
  },
  detailContent: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  detailLabel: {
    fontSize: 16,
    color: '#5f6368',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#202124',
    fontWeight: '600',
  },

  // List styles
  list: {
    padding: 16,
  },
  listHeader: {
    fontSize: 24,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 16,
    marginLeft: 4,
  },

  // Dialog styles
  dialogContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 16,
  },
  dialogMessage: {
    fontSize: 16,
    color: '#5f6368',
    marginBottom: 24,
  },
  dialogButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dialogButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  dialogButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Transaction styles
  transactionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  transactionId: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIdText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF506B',
    marginLeft: 8,
  },
  transactionDate: {
    fontSize: 14,
    color: '#5f6368',
  },
  transactionBody: {
    marginBottom: 12,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#202124',
    marginLeft: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountLabel: {
    fontSize: 14,
    color: '#5f6368',
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#EF506B',
  },
  transactionFooter: {
    alignItems: 'flex-end',
  },
  screenHeader: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#202124',
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 14,
    color: '#5f6368',
  },

  // Transaction Detail styles
  detailSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#202124',
    marginBottom: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 16,
    color: '#202124',
    marginLeft: 12,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF506B',
  },

  // Service Card styles
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  serviceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f0fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#202124',
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
    color: '#EF506B',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#202124',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#5f6368',
    marginTop: 8,
  },

  // Service Detail styles
  detailCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginVertical: 16,
    marginHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#202124',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  detailPrice: {
    fontSize: 36,
    fontWeight: '700',
    color: '#EF506B',
    textAlign: 'center',
    marginVertical: 8,
  },
  buttonContainer: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EF506B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF506B',
    marginLeft: 8,
  },
  deleteButton: {
    borderColor: '#dc3545',
    backgroundColor: '#fff5f5',
  },
  deleteButtonText: {
    color: '#dc3545',
  },
  headerButton: {
    padding: 8,
    marginRight: 8,
  },

  // Settings styles
  settingsContainer: {
    padding: 16,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  settingsButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#dc3545',
    marginLeft: 12,
  },

  // Transaction Detail Screen
  transactionDetailContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  transactionDetailSection: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 15,
  },
  transactionDetailSectionTitle: {
    fontSize: 18,
    color: '#f06292',
    marginBottom: 15,
    fontWeight: '600',
  },
  transactionDetailInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  transactionDetailLabel: {
    color: '#757575',
    fontSize: 15,
    fontWeight: '500',
  },
  transactionDetailValue: {
    color: '#212121',
    fontSize: 15,
    fontWeight: '500',
  },
  transactionDetailServiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  transactionDetailServiceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionDetailServiceName: {
    color: '#212121',
    fontSize: 15,
    fontWeight: '500',
    marginRight: 8,
  },
  transactionDetailServiceQuantity: {
    color: '#757575',
    fontSize: 15,
    fontWeight: '500',
  },
  transactionDetailServicePrice: {
    color: '#212121',
    fontSize: 15,
    fontWeight: '500',
  },
  transactionDetailTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 10,
  },
  transactionDetailTotalAmount: {
    color: '#212121',
    fontSize: 16,
    fontWeight: '600',
  },
  transactionDetailDiscountValue: {
    color: '#f06292',
    fontSize: 15,
    fontWeight: '500',
  },
  transactionDetailTotalPaymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 10,
  },
  transactionDetailTotalPayment: {
    color: '#f06292',
    fontSize: 18,
    fontWeight: '600',
  },

  // Transaction List
  transactionCard: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 5,
    padding: 15,
    borderRadius: 8,
    elevation: 1,
  },
  transactionIdDate: {
    flexDirection: 'row',
    marginBottom: 8,
    color: '#212121',
    fontSize: 15,
    fontWeight: '500',
  },
  transactionServices: {
    marginBottom: 5,
  },
  transactionServiceItem: {
    color: '#757575',
    fontSize: 15,
    marginBottom: 2,
  },
  transactionCustomerRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  transactionCustomerLabel: {
    color: '#757575',
    fontSize: 15,
  },
  transactionCustomerName: {
    color: '#757575',
    fontSize: 15,
    marginLeft: 5,
  },
  transactionPrice: {
    color: '#f06292',
    fontSize: 16,
    fontWeight: '500',
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  transactionCancelled: {
    color: '#dc3545',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 5,
  },
});
