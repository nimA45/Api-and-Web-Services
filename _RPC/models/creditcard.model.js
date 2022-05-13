
module.exports = mongoose => {
    let schema = mongoose.Schema({
        card_secret: String,
        card_holder_name: String,
        card_number: String,
        card_validity: String,
        ccv_code: String,
        balance: Number,
    });

    const CreditCard = mongoose.model("creditcard", schema);
    return CreditCard;
};


// {
//     "card_secret": "abcdefg",
//     "card_holder_name": "Person 1 Name",
//     "card_number": "12345",
//     "card_validity": "12/23",
//     "ccv_code": "000",
//     "balance": 9999
// }