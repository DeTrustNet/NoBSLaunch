// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

interface IBaseDistributor {
    enum RewardType{
        TOKEN,
        CURRENCY
    }

    struct RewardInfo{
        string name;
        address rewardAddress;
        uint256 decimals;
    }

//    uint256 public constant defaultDecimals = 10 ** 18;

    function deposit() external payable;
    function rewardCurrency() external view returns(string memory);
}
