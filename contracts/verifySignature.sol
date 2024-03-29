// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/* Signature Verification

How to Sign and Verify
# Signing
1. Create message to sign
2. Hash the message
3. Sign the hash (off chain, keep your private key secret)

# Verify
1. Recreate hash from the original message
2. Recover signer from signature and hash
3. Compare recovered signer to claimed signer
*/

contract VerifySignature {
   function verify(address _signer, string memory _message, bytes memory _sig)external pure returns (bool)
   {

        bytes32 messageHash = getMessageHash(_message);
        bytes32 ethSignMessageHash = getEthSignMessageHash(messageHash);

        return recover(ethSignMessageHash, _sig) == _signer;

   }

   function getMessageHash(string memory _message) public pure returns (bytes32)
   {
        return keccak256(abi.encodePacked(_message));
   }

    function getEthSignMessageHash(bytes32 _messageHash) public pure returns (bytes32)
   {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32",_messageHash));
   }

   function recover(bytes32 _ethSignedMessageHash, bytes memory _sig)public pure returns(address)
   {
    (bytes32 r, bytes32 s, uint8 v) = _split(_sig);
    return ecrecover(_ethSignedMessageHash, v, r, s);
   }

   function _split(bytes memory _sig) internal pure returns (bytes32 r, bytes32 s, uint8 v)
   {
     require(_sig.length == 65, "Invalid signature length");
     assembly{
        r := mload(add(_sig, 32))
        s := mload(add(_sig, 64))
        v := byte(0, mload(add(_sig, 96)))
     }

    
   }

}
