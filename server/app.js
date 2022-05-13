const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
app.use(cors(
    {
        "origin": "*"
    }
));

app.use(express.json());

const PORT = 8071;

app.post('/transactions', async (req, res) => {

    // S'il y a des données envoyées
    if(!req.body)
        return res.json({
            message: 'nok'
        })

    let message = null

    // Premiere appel a l'API creditcard - Verification de la carte
    await axios.post('http://localhost:8070/transactions/transaction.pay', req.body)
    .then(function (response) {
        message = response.data
    })
    .catch(function (error) {
        console.log(error.response.data)
        message = error.response.data
    });

    // Si le paiement echoue
    if(message !== 'payment success')
        return res.status(400).json({message: message})

    // Deuxieme appel a l'API creditcard - Recuperation de la balance de la carte
    await axios.get('http://localhost:8070/creditcards/creditcard.balance', {params: req.body})
    .then(function (response) {
        message = message + '\ncard: ' + req.body.card_number + '\namount: ' + response.data.balance
    })
    .catch(function (error) {
        console.log(error)
    });

    return res.json({message: message})
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});