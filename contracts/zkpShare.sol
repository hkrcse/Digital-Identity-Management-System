// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;
struct info{
    bytes32  proof;
    bytes32  encryptedAge;
}
contract zkpShare
{
    address[]add;
    mapping(address=>info)data;
    mapping(address=>address[])shareAddressData;
    mapping(address=>address[])userData;

    function setData(bytes32 _proof,bytes32 encryptedAge,address _userWallet,address _shareWallet)public
    {

        //set proof to userAddress
        data[_userWallet] = info(_proof,encryptedAge);

        //seet userAddress to ShareAddress

        address[] memory existingAddresses2 = shareAddressData[_shareWallet];
        address[] memory newAddresses2 = new address[](existingAddresses2.length + 1);

        for (uint i = 0; i < existingAddresses2.length; i++) {
            newAddresses2[i] = existingAddresses2[i];
        }

        newAddresses2[existingAddresses2.length] = _userWallet;
        shareAddressData[_shareWallet] = newAddresses2;

        //set shareAddress to UserAddress

        address[] memory existingAddresses3 = userData[_userWallet];
        address[] memory newAddresses3 = new address[](existingAddresses3.length + 1);

        for (uint i = 0; i < existingAddresses3.length; i++) {
            newAddresses3[i] = existingAddresses3[i];
        }

        newAddresses3[existingAddresses3.length] = _shareWallet;
        userData[_userWallet] = newAddresses3;

    }

    function getUserProofAndEncryptAge(address _add)public view returns (info memory)
    {
        return data[_add];
    }
    function getUserAddressArray(address _add)public view returns (address[] memory)
    {
        return shareAddressData[_add];
    }
     function getShareAddressArray(address _add)public view returns (address[] memory)
    {
        return userData[_add];
    }


}