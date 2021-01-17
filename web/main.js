

  ethereum.request({ method: 'eth_requestAccounts' });
if ( typeof web3 != 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }
console.log('using version : '+ web3.version );

let contractAddress = '0xf9B2192fc50b79476858970C860B5eF9c5472A2e'; 
let contractForm = document.querySelector('#contract-form');

let ApprovalContract = new web3.eth.Contract(abi, contractAddress);

console.log(abi)

console.log(ApprovalContract)
contractForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let fromAddress = document.querySelector('#fromAddress').value;

    let toAddress = document.querySelector('#toAddress').value;
    let amount = document.querySelector('#amount').value;

    if(!web3.utils.isAddress(fromAddress)){
        alert('fromAddress n\'est pas une addresse eth' )
        return
    }
    if(!web3.utils.isAddress(toAddress)){
        alert('toAddress n\'est pas une addresse eth' )
        return
    }
    if(amount <= 0){
        alert('veuillez entrer un montant valide' )
        return
    }
    if(!web3.utils.isAddress(contractAddress)){
        alert('contract n\'est pas une addresse eth' )
        return
    }

   
    ApprovalContract.methods.deposit(toAddress).send({from: fromAddress, to: toAddress, gas: 100000, value: web3.utils.toWei(amount, 'ether')},
        (error, result) =>{
            console.log(fromAddress+ '-------------' + toAddress)
            if(error){
                console.log(error)
                document.querySelector('#deposit-result').innerHTML = '<b> Error : '+ error.message + '</b>';
            
            } else{
                document.querySelector('#deposit-result').innerHTML = '<b> Success  : '+ result + '</b>'
            }
             
        })
});

 document.querySelector('#get-balance-form').addEventListener('submit', (e)=>{
     e.preventDefault();
     
     web3.eth.getBalance(contractAddress, (err, resp) =>{
         
         if(err) {
             console.log('error '+ err);
         }else  {
             document.querySelector('#the-balance').innerHTML = '<b>current balance : '+ web3.utils.fromWei(resp) +'</b>'
         }
    });
 })

 document.querySelector('#approve-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    
     ApprovalContract.methods.approve().call({from: contractAddress, to: toAddress, gas: 100000},
        function(error, result) {
        if (error) {
            console.log('error: ' + error);
        }
        else {
            console.log('result: ' + JSON.stringify(result));
            document.querySelector('#approval-display').innerHTML = 'Transaction Approved. TX: <b>' + result + '</b>';
        }
        });
})

document.querySelector('#approver-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    
    ApprovalContract.methods.viewApprover().call(
        function(error, result) {
          if (error) {
            console.log('error: ' + error);
          }
          else {
            console.log('result: ' + JSON.stringify(result));
            document.querySelector('#approver-display').innerHTML ='Approver Address: <b>' + result + '</b>';
          }
        });
})