// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

struct Info {
    bool share;
    string image_front;
    string image_back;
    string message;
    address shareAddress;
    address walletAddress;
    address signer;
    bytes signature;
}

contract Share {
   
   mapping(address => Info) shareData;
   mapping(address => address[]) shareAddData;
   mapping(address => address[]) shareWalletData;

   function setShareInfo(bool _share,string memory _imageFront,string memory _imageBack, string memory _message, address _shareAddress, address _walletAddress, address _signer,bytes memory _signature) public {
        Info memory data = Info(
            _share,
            _imageFront,
            _imageBack,
            _message,
            _shareAddress,
            _walletAddress,
            _signer,
            _signature
        );
        
        shareData[_walletAddress] = data;
   }

    function setShareData(address _shareAdddress, address _walletAddress) public {
        address[] memory existingAddresses = shareAddData[_walletAddress];
        address[] memory newAddresses = new address[](existingAddresses.length + 1);

        for (uint i = 0; i < existingAddresses.length; i++) {
            newAddresses[i] = existingAddresses[i];
        }

        newAddresses[existingAddresses.length] = _shareAdddress;
        shareAddData[_walletAddress] = newAddresses;
    }
     function setShareWalletData(address _walletAddress, address _shareAddress) public {
        address[] memory existingAddresses = shareWalletData[_shareAddress];
        address[] memory newAddresses = new address[](existingAddresses.length + 1);

        for (uint i = 0; i < existingAddresses.length; i++) {
            newAddresses[i] = existingAddresses[i];
        }

        newAddresses[existingAddresses.length] = _walletAddress;
        shareWalletData[_shareAddress] = newAddresses;
    }
    function getShareWalletData(address _a) public view returns(address[] memory) {
      return shareWalletData[_a];
   }

   function getShareData(address _a) public view returns(address[] memory) {
      return shareAddData[_a];
   }

   function checkShareStatus(address _a) public view returns (Info memory) {
       return shareData[_a];
   }
}
