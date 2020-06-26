import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    let { income, outcome, total } = this.balance;

    if (type === 'income') {
      income += value;
      total += value;
    } else {
      outcome += value;
      total -= value;
    }

    this.balance = {
      ...this.balance,
      income,
      outcome,
      total,
    };

    this.transactions.push(transaction);
    return transaction; // TODO
  }
}

export default TransactionsRepository;
