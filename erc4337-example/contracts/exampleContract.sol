// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
contract exampleContract {
    address public owner;
    uint private counter;
    using ECDSA for bytes32;
    // Nonce for signature replay protection
    uint256 public nonce;
    // Timestamp of the last successful transaction execution
    uint256 public lastTxTimestamp;

    // Cooldown period (in seconds) between allowed transactions (3 minutes)
    uint256 public constant COOLDOWN = 3 minutes;

    /**
        Events
    */

    // Emitted when a transaction is executed successfully
    event TransactionExecuted(
        address indexed signer,
        uint256 nonce,
        uint256 timestamp
    );
    // Emitted when the smart account is upgraded (if applicable)
    event AccountUpgraded(address newImplementation);

    constructor() {
        nonce = 0;
        lastTxTimestamp = 0;
        owner = msg.sender;
        counter = 0;
    }

    /**
        Modifiers    
    */

    modifier onlyWhenCoolDownPeriodOver() {
        // Ensure the cooldown period has elapsed before executing another transaction.
        require(
            block.timestamp >= lastTxTimestamp + COOLDOWN,
            "Cooldown period not elapsed"
        );
        _;
    }

    modifier onlyWhenItHasValidSignature(
        bytes calldata data,
        bytes calldata signature
    ) {
        // Prepare a hash that includes the current nonce, the data, and the chain ID for replay protection.
        bytes32 txHash = keccak256(
            abi.encodePacked(address(this), nonce, data, block.chainid)
        );
        require(validateSignature(txHash, signature), "Invalid signature");
        _;
    }

    /**
     * @notice Validates a signature against the computed hash.
     * @param hash The hash of the transaction data, nonce, and context.
     * @param signature The signature to verify.
     * @return True if the signature is valid and matches the owner's address.
     */
    function validateSignature(
        bytes32 hash,
        bytes calldata signature
    ) public view returns (bool) {
        address recovered = hash.recover(signature);
        return (recovered == owner);
    }

    function increamentCounter()
        external
        onlyWhenCoolDownPeriodOver
    {
        counter++;
        lastTxTimestamp = block.timestamp;
        emit TransactionExecuted(owner, nonce, block.timestamp);
    }

    function getCounter() public view returns (uint) {
        return counter;
    }

}
