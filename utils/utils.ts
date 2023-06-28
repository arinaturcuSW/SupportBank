import { Transaction, TransactionJSON, TransactionXML } from '../src/types';

export function json2Transaction(transaction: TransactionJSON): Transaction {
    return {
        Date: transaction.Date,
        From: transaction.FromAccount,
        To: transaction.ToAccount,
        Narrative: transaction.Narrative,
        Amount: transaction.Amount
    }
}

export function xml2Transaction(transaction: TransactionXML): Transaction {
    return {
        Date: transaction['@_Date'],
        From: transaction.Parties.From,
        To: transaction.Parties.To,
        Narrative: transaction.Description,
        Amount: transaction.Value
    }
}
