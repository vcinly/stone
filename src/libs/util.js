import axios from 'axios';
import env from '../config/env';
import config from '../config/config';

var Web3EthAbi = require('web3-eth-abi');
var Web3Utils = require('web3-utils');

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    "https://api-rinkeby.etherscan.io" :
    env === 'production' ?
    "https://api.etherscan.io" :
    "https://api-ropsten.etherscan.io";

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.getTxlist = function (address, page=1, offset=10, sort='asc') {
    return util.ajax.get('/api', {
        params: {
            module: 'account',
            action: 'txlist',
            address: address,
            startblock: 0,
            endblock: 99999999,
            page: page,
            offset: offset,
            sort: sort,
            apikey: config.apikey
        }
    });
};

util.getCall = function (contract, data) {
    return util.ajax.get('/api', {
        params: {
            module: 'proxy',
            action: 'eth_call',
            to: contract,
            data: data,
            tag: 'latest',
            apikey: config.apikey
        }
    });
};


// createTopic

// getTopicAddress

util.getTopicsList = (total, page, offset=20) => {
    if ((page * offset) > (total+offset)) {
        return [];
    } else {
        let start = (page - 1) * offset - 1;
        start = start < 0 ? 0 : start;
        let diff = total - start;
        let len = diff < offset ? diff : offset;
        console.log('start', start);
        console.log('len', len);
        let data = Web3EthAbi.encodeFunctionCall({
            name: 'topicsList',
            type: 'function',
            inputs: [{
                type: 'uint256',
                name: 'start'
            },{
                type: 'uint256',
                name: 'len'
            }]
        }, [start, len]);
        return util.getCall(config.contract, data);
    }
};

util.getTopicsCount = () => {
    // let data = web3.eth.abi.encodeFunctionSignature('topicsCount()');
    let data = '0x9f0103a6';
    return util.getCall(config.contract, data);
};

util.getTopicName = (address) => {
    // let data = web3.eth.abi.encodeFunctionSignature('name()');
    let data = '0x06fdde03';
    return util.getCall(address, data);
};

util.decodeParameter = (type, data) => {
    return Web3EthAbi.decodeParameter(type, data);
};
util.decodeParameters = (types, data) => {
    return Web3EthAbi.decodeParameters(types, data);
};
util.hexToUtf8 = (data) => {
    return Web3Utils.hexToUtf8(data);
};


export default util;
