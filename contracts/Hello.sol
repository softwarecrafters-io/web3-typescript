// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Hello {
    uint public _myValue = 1;

    function setValue(uint myValue) public {
        _myValue = myValue ;
    }
}