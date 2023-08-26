import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';

const domain = window.location.host;
const origin = window.location.origin;
// console.log("window.ethereum: ", window.ethereum)
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

async function getChainId() {
    const chainId = await provider.getNetwork().then(network => network.chainId);
    return chainId;
}

async function createSiweMessage(address, statement) {
    const res = await fetch(`${process.env.BACKEND_ADDR}/nonce`, {
        credentials: 'include',
    });

    let issuedAt = new Date()
    // let expireDate = new Date(issuedAt.getTime() + (4 * 60 * 60)); // adding 4 hours
    const expireDate = new Date(issuedAt.getTime() + (4 * 60 * 60 * 1000)); // four hours later
    let msgBody = {
        domain: domain,
        address,
        statement,
        uri: origin,
        version: '1',
        chainId: parseInt(await getChainId()),
        nonce: await res.text(),
        issuedAt: issuedAt.toISOString(),
        expirationTime: expireDate.toISOString()
    }
    console.log("msgBody: ", msgBody)
    const message = new SiweMessage(msgBody);
    console.log("message.prepareMessage(): ", message.prepareMessage())
    return message.prepareMessage();
}

function connectWallet() {
    provider.send('eth_requestAccounts', [])
        .catch(() => console.log('user rejected request'));
}

async function signInWithEthereum() {
    const message = await createSiweMessage(
        await signer.getAddress(),
        'Sign in with Ethereum to the app.'
        // userMsg.value
    );
    const signature = await signer.signMessage(message);
    signedUserMsg.text = ("message: " + message + "\nsignature: " + signature)
    console.log("message: ", message)
    console.log("signature: ", signature)

    // const res = await fetch(`${BACKEND_FC_ADDR}`, {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ message, signature }),
    //     credentials: 'include'
    // });
    // console.log(await res.text());

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ message, signature }),
        redirect: 'follow'
    };

    fetch(BACKEND_FC_ADDR, requestOptions)
        // .then(response => { response.text() })
        .then(response => response.text())
        .then(result => {document.cookie = (JSON.parse(result))["token"];console.log("result: ", result); alert(document.cookie)})
        .catch(error => console.log('error', error));
}

async function getInformation() {
    const res = await fetch(`${BACKEND_ADDR}/personal_information`, {
        credentials: 'include',
    });
    console.log(await res.text());
}

function formatString() {
    formatedMsg.text = (userMsg.value).replace(/\n/g, '\\n')
}

// kyc request to exchange
function kycRequest() {
    // console.log("document.cookie: ", document.cookie);
    // const myCookieValue = getCookieValue('token');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${document.cookie}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", `${document.cookie}`);

    //
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:8000/kyc/PersonalDataAndDocuments", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

const connectWalletBtn = document.getElementById('connectWalletBtn');
const siweBtn = document.getElementById('siweBtn');
const infoBtn = document.getElementById('infoBtn');
const formatStrBtn = document.getElementById('formatStrBtn');
const kycRequestBtn = document.getElementById('kycRequestBtn');
const userMsg = document.getElementById('userMsg');
const signedUserMsg = document.getElementById('signedUserMsg');
const formatedMsg = document.getElementById('formatedMsg');
connectWalletBtn.onclick = connectWallet;
siweBtn.onclick = signInWithEthereum;
infoBtn.onclick = getInformation;
formatStrBtn.onclick = formatString;
kycRequestBtn.onclick = kycRequest;
