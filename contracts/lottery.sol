// SPDX-License-Identifier: GPL-3.0 
pragma solidity >=0.5.0 <0.9.0;

contract lottery  {

      address   public admin;

      string  public name="Monthly Bumber";
      string  public symbol="MOA";
      uint256 public maxTickets=1000;
      uint256 public remainingTickets = 1000;
      uint    public ticketCount =0;
 	address payable public winner;

   
    address payable[] public tickets;
    address[] public lastwinners;
     mapping(uint => address)uniqueid;

    modifier onlyAdmin(){
    admin=msg.sender;
            _;
        }

     function AddressId(address user)public pure returns(uint){
        return uint(keccak256(abi.encodePacked(user)))%10000000000000;
        
    }

    function Buy(uint _unid)external payable{
        // require(msg.value ==1000000000000000000);
        uint256 val= msg.value / 1000000000000000000;
        // require(remainingTickets - val <= remainingTickets);
        remainingTickets -= val;
        uniqueid[_unid]=msg.sender;
        
        require(msg.sender != admin);

        require(msg.value > 0.1 ether);
        tickets.push(payable(msg.sender));
        
        ticketCount++;

    }
    function getBalance()public view returns(uint)
    {
        //return the contract balance
        return address(this).balance;
    }

    
     function getBuyer(uint _unid) public view returns(address _lotteryOwner){
        _lotteryOwner = uniqueid[_unid];
    }
  


   function random()internal view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,tickets.length)));

    }

    function pickWinner() public{
        // require(admin == msg.sender,"you have no authority");
        require(tickets.length >= 1,"Not enough tickets");
        // address payable winner;

        winner=tickets[random()% tickets.length];
        winner.transfer(getBalance());
        lastwinners.push(winner);

        tickets= new address payable[](0);
        delete winner;
    }

 function getlastwinners()public view returns(address[] memory)
    {
        return lastwinners;
    }

     
    function getPlayers()public view returns(address payable[] memory)
    {
        return tickets;
    }



}