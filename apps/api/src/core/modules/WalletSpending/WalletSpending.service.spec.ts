jest.mock('../Wallet/Wallet.service');
import { SpendingBuilder, WalletBuilder } from '@spending-app/core-tests';
import { WalletSpendingService } from './WalletSpending.service';

describe('WalletSpending.service', () => {
  describe('apply debit', () => {
    describe('of card ', () => {
      it('success', async () => {
        const wallet = new WalletBuilder().debit().amount(25).get();
        const spending = new SpendingBuilder().value(15).debit().get();
        const result = await WalletSpendingService._applyDebit(wallet, spending);
        expect(result.availableAmount).toEqual(10);
      });
      it('not accept debit', () => {
        const wallet = new WalletBuilder().amount(25).get();
        const spending = new SpendingBuilder().value(15).debit().get();

        expect(() => WalletSpendingService._applyDebit(wallet, spending))
          .toThrow('Wallet not accept debit');
      });
      it('amount not available', () => {
        const wallet = new WalletBuilder().amount(10).debit().get();
        const spending = new SpendingBuilder().value(15).debit().get();

        expect(() => WalletSpendingService._applyDebit(wallet, spending))
          .toThrow('Amount not available');
      });
    });
    describe('money', () => {
      it('success', async () => {
        const wallet = new WalletBuilder().amount(25).get();
        const spending = new SpendingBuilder().value(15).get();
        const result = await WalletSpendingService._applyDebit(wallet, spending);
        expect(result.availableAmount).toEqual(10);
      });
      it('amount not available', () => {
        const wallet = new WalletBuilder().amount(10).get();
        const spending = new SpendingBuilder().value(15).get();

        expect(() => WalletSpendingService._applyDebit(wallet, spending))
          .toThrow('Amount not available');
      });
    });
  });
  describe('apply credit', () => {
    it('success', async () => {
      const wallet = new WalletBuilder().limit(25).availableLimit(20).credit().get();
      const spending = new SpendingBuilder().value(15).credit().get();
      const result = await WalletSpendingService._applyCredit(wallet, spending);
      expect(result.availableCreditLimit).toEqual(5);
    });
    it('not accept credit', () => {
      const wallet = new WalletBuilder().amount(25).get();
      const spending = new SpendingBuilder().value(15).credit().get();

      expect(() => WalletSpendingService._applyCredit(wallet, spending))
        .toThrow('Wallet not accept credit');
    });
    it('limit not available', () => {
      const wallet = new WalletBuilder().limit(10).availableLimit(10).credit().get();
      const spending = new SpendingBuilder().value(15).credit().get();

      expect(() => WalletSpendingService._applyCredit(wallet, spending))
        .toThrow('Limit not available');
    });
  });
});
