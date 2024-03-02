// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

struct nidInfo{
    string imageFrontUrl;
    string imageBackUrl;
    string  nidNo;
    string name;
    string dob;
    string nationality;
    address walletAddress;
    address signer;
}
struct nidInfo2
{
    string f_name;
    string m_name;
    string permanentAddress;
    string nid_No; 
    address walletAddress;

}
struct nidInfo3
{
    string nid_No; 
    address walletAddress;
    address signer;
    bytes signature;

}

contract nid{

    mapping (address=>bool)IsNidRegisteredAddress;
    mapping (string=>bool)IsNidRegistered;
    mapping (string=>nidInfo)data;
    mapping(string=>nidInfo2)data2;
    mapping(string=>nidInfo3)data3;
    mapping(address=>string)nidData;

    string[]public nidNoArray;
    


    function setNid(string memory _imageUrlFront,string memory _imageUrlBack,string memory _nidNo,string memory _name,string memory _dob,string memory _nationality,address _walletAddress,address _signer)public
    {
        nidInfo memory info = nidInfo(
            _imageUrlFront,
            _imageUrlBack,
            _nidNo,
            _name,
            _dob,
            _nationality,
            _walletAddress,
            _signer
        );

        require(!IsNidRegisteredAddress[_walletAddress],"Already Registed!!!!!");
        require(!IsNidRegistered[_nidNo],"Already Registed!!!!!");
        data[_nidNo] = info;
        IsNidRegistered[_nidNo] = true;
        IsNidRegisteredAddress[_walletAddress] = true;
        nidNoArray.push(_nidNo);
        nidData[_walletAddress] = _nidNo;


    }
    function setNid2(string memory _f_name,string memory _m_name,string memory _permanentAddress,string memory _nidNo,address _walletAddress)public
    {
         nidInfo2 memory info = nidInfo2(
            _f_name,
            _m_name,
            _permanentAddress,
            _nidNo,
            _walletAddress
         ); 
         data2[_nidNo] = info;

    }
    function setNid3(string memory _nidNo,address _walletAddress,address _signerAddress,bytes memory _signature)public
    {
         nidInfo3 memory info = nidInfo3(
            _nidNo,
            _walletAddress,
            _signerAddress,
            _signature
         ); 
         data3[_nidNo] = info;
    }
    function getNid(string memory _nidNo)public view returns (nidInfo memory)
    {
        return data[_nidNo];
    }
    function getNid2(string memory _nidNo)public view returns (nidInfo2 memory)
    {
        return data2[_nidNo];
    }
    function getNid3(string memory _nidNo)public view returns (nidInfo3 memory)
    {
        return data3[_nidNo];
    }
    function checkStatus(string memory _nidNo)public view returns (bool)
    {
        return IsNidRegistered[_nidNo];
    }
    function checkAddressStatus(address _walletAddress)public view returns (bool)
    {
        return IsNidRegisteredAddress[_walletAddress];
    }
    function getNidNo(address _address) public view returns (string memory) {
        return nidData[_address];
    }
     function getNidArrayLength() public view returns (uint) {
        return nidNoArray.length;
    }

    // Public function to get the element at a specific index in the dynamic array
    function getNidArrayElement(uint _index) public view returns (string memory) {
        require(_index < nidNoArray.length, "Index out of bounds");
        return nidNoArray[_index];
    }

}
