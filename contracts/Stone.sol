pragma solidity ^0.4.24;

contract Stone {
  address public owner;
  address[] topics;
  uint256 public listLimit = 20;

  constructor() public {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    if (msg.sender == owner) _;
  }

  function withdraw() external onlyOwner {
    owner.transfer(address(this).balance);
  }

  function createTopic(string name) external {
    address newTopic = new Topic(name);
    topics.push(newTopic);
  }

  function closeTopic(address topic) external onlyOwner {
    Topic _topic = Topic(topic);
    _topic.close();
  }
  function withdrawTopic(address topic) external onlyOwner {
    Topic _topic = Topic(topic);
    _topic.withdraw();
  }

  function topicsCount() public view returns (uint) {
    return topics.length;
  }

  function getTopic(uint256 index) public view returns (address) {
    require(index >= 0);
    require(index < topics.length);
    return topics[index];
  }

  function setListLimit(uint256 val) external onlyOwner {
    listLimit = val;
  }

  function topicsList(uint256 start, uint256 len) public view returns (address[]) {
    require(start >= 0);
    require(len <= listLimit);
    address[] memory list = new address[](len);

    for(uint i = 0; i < len; i++) {
      list[i] = topics[start + i];
    }

    return list;
  }

  /* Thank you for donating to the Stone */
  function() external payable { }
}

contract Topic {
  string public name;
  address public stone;

  constructor(string _name) public {
    name = _name;
    stone = msg.sender;
  }

  modifier onlyStone() {
    if (msg.sender == stone) _;
  }

  function close() external onlyStone {
    selfdestruct(stone);
  }

  function withdraw() external onlyStone {
    stone.transfer(address(this).balance);
  }

  function() external payable { }
}
