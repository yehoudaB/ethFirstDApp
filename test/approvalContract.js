const ApprovalContract  = artifacts.require('../approvalContract.sol');

contract('ApprovalContract', function(accounts){
    it('initiates contract', async function () {
            const contract = await ApprovalContract.deployed();
            const approver = await contract.approver.call();
            assert.equal(approver,0xf9B2192fc50b79476858970C860B5eF9c5472A2e,"approver don't match")
    });

    it('takes a deposit', async () =>{
        const contact =  await ApprovalContract.deployed();
        await contact.deposit(accounts[0], {value: 1e+18, from:  accounts[1]});
        assert.equal(web3.eth.getBalance(contact.address), 1e+18, "amount did not match" );
    });

});