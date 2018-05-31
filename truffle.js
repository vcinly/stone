// Allows us to use ES6 in our migrations and tests.
require('babel-register');
var HDWalletProvider = require("truffle-hdwallet-provider");
var config = require('./config.json');

module.exports = {
    networks: {
        development: {
            host: '127.0.0.1',
            port: 7545,
            network_id: '*' // Match any network id
        },
        rinkeby: {
            provider: function() {
                return new HDWalletProvider(config.mnemonic, `https://rinkeby.infura.io/${config.infura}`);
            },
            network_id: "*"
        }
    }
}
