// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

struct issuerInfo{
    string userName;
    string userType;
    address walletAddress;
}

contract issuer{
    
    mapping(address=>issuerInfo)data;
    mapping(address=>bool)isRegistered;


    function setIssuer(string memory _userName,string memory _userType,address _address)public
    {
        issuerInfo memory info = issuerInfo(
            _userName,
            _userType,
            _address
        );

        require(!isRegistered[_address],"Already Registered!!!");
        data[_address] = info;
        isRegistered[_address] = true;
    }

    function getIssuer(address _address) public view returns (issuerInfo memory)
    {
        return data[_address];
    }

    function checkStatus(address _address) public view returns(bool)
    {
        return isRegistered[_address];
    }

}