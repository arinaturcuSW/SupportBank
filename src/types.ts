export type Transaction = {
    Date: string,
    From: string,
    To: string,
    Narrative: string,
    Amount: string,
}

export type TransactionJSON = {
    Date: string,
    FromAccount: string,
    ToAccount: string,
    Narrative: string,
    Amount: string,
}
