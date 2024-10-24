const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const merkle = new MerkleTree(niceList)

  // select random item from the list of name
  let name = niceList[Math.floor(Math.random()*niceList.length)]
  
  let nameIndex = niceList.findIndex((a) => a === name)
  let proof = merkle.getProof(nameIndex)

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof: proof,
    name: name
  });

  console.log({ gift });
}

main();