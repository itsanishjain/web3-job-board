// File: @openzeppelin/contracts/utils/Context.sol

// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// File: contracts/JobBoard.sol



// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract JobBoard is Ownable {
    uint256 public JOB_ID = 0; // Primary key
    address ADMIN = msg.sender;

    // Job datatype
    struct Job {
        uint256 jobId;
        string companyName;
        string position;
        string description;
        string employmentType;
        string location;
        string companyWebsiteUrl;
        address employer;
    }

    Job[] public jobs;
    mapping(address => address[]) public applicants;

    // add a job
    // default parameter is not there in Solidity
    function addJob(
        string memory _companyName,
        string memory _position,
        string memory _description,
        string memory employmentType,
        string memory _location,
        string memory _companyWebsiteUrl
    ) public payable {
        require(msg.value == 5 * 10**15);
        Job memory job = Job({
            jobId: JOB_ID,
            companyName: _companyName,
            position: _position,
            description: _description,
            employmentType: employmentType,
            location: _location,
            companyWebsiteUrl: _companyWebsiteUrl,
            employer: msg.sender
        });
        jobs.push(job);
        JOB_ID++;
    }

    // return all jobs
    function allJobs() public view returns (Job[] memory) {
        return jobs;
    }

    // delete a job
    function deleteJob(uint256 _jobId) public {
        require(msg.sender == jobs[_jobId].employer || msg.sender == ADMIN);
        // delete jobs[_jobId]; // this creates the gap means data at this location is null but
        // index still returns null

        // Alternative way which shifts the items from array
        if (_jobId >= jobs.length) return;
        for (uint256 i = _jobId; i < jobs.length - 1; i++) {
            jobs[i] = jobs[i + 1];
            jobs[i].jobId = i;
        }
        delete jobs[jobs.length - 1];
        JOB_ID--;
    }

    // Apply for a job
    function applyForJob(uint256 _jobid) public {
        // add sender address to job applicants
        // applicants[jobs[_jobid].employer].push(_jobid);
        applicants[jobs[_jobid].employer].push(msg.sender);
    }

    // return this
    function admin() public view returns (address) {
        return ADMIN;
    }

    function withdraw(address payable _adminAddress) public onlyOwner {
        _adminAddress.transfer(address(this).balance);
    }

    function totalJobs() public view returns (uint256) {
        return jobs.length;
    }
}
