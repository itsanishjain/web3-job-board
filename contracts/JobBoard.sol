// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

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
