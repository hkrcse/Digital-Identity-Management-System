// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;
struct info{
    string userName;
    address walletAddress;
    string userType;
}

contract user{
    mapping(address=>info)data;
    mapping(address=>bool)isRegistered;

    function setUser(string memory _user,address _walletAddress,string memory _tpye)public
    {
        info memory _data = info(
            _user,
            _walletAddress,
            _tpye
        );
        require(!isRegistered[_walletAddress],"Already Registered!!!!!!");
        data[_walletAddress] = _data;
        isRegistered[_walletAddress] = true;
    }

    function getUser(address _walletAddress) public view returns(info memory)
    {
        return data[_walletAddress];
    }

    function checkRegistered(address _walletAddress)public view returns(bool)
    {
        return isRegistered[_walletAddress];
    }
    
}