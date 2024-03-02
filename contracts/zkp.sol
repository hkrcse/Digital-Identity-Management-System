// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

struct info{
    bytes32  proof;
    bytes32  encryptedAge;
}
contract zkp {
     
    function calculateProof(string memory seed, uint256 ageActual, uint256 ageToProve) public pure returns(info memory){
        bytes32  proof;
        bytes32  encryptedAge;
       
        // Initialization
        bytes memory sd = abi.encodePacked(seed);
        proof = keccak256(sd);
        encryptedAge = keccak256(sd);

        // Calculate proof
        for (uint256 i = 1; i <= ageActual - ageToProve; i++) {
            proof = keccak256(abi.encodePacked(proof));
        }

        // Calculate encrypted age
        for (uint256 i = 1; i <= ageActual; i++) {
            encryptedAge = keccak256(abi.encodePacked(encryptedAge));
        }

       
       
        return  info(proof,encryptedAge);
    }

    function verifyAge(bytes32 encryptedAge,bytes32 proof,uint256 ageToProve) public pure returns (bool) {
         bytes32  verifiedAge;
         verifiedAge = proof;

        for (uint256 i = 0; i < ageToProve; i++) {
          verifiedAge = keccak256(abi.encodePacked(verifiedAge));
        }
        return  encryptedAge==verifiedAge;
    }
}
