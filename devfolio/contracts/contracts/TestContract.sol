// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TestContract {
    string public name = "Test";
    
    function getName() external view returns (string memory) {
        return name;
    }
}
