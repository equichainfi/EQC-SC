// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

error PropertyNft__NonexistentToken(uint256 tokenId);

contract PropertyNft is ERC721 {
    string public i_uri = "";
    uint256 private s_tokenCounter;

    event PropertyMinted(uint256 indexed tokenId, address indexed to);

    constructor() ERC721("PropertyNft", "PNFT") {
        s_tokenCounter = 0;
    }`

    function mint(uint256 tokeId, address to) public {
        _safeMint(msg.sender, tokeId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        if (_exists(tokenId)) {
            return i_uri;
        } else {
            revert PropertyNft__NonexistentToken(tokenId);
        }
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
