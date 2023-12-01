// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721Burnable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

error PropertyNft__NonexistentToken(uint256 tokenId);

/// @title PropertyNft
/// @author Olivier Kobialka, 2023
/// @notice Contract for basic ERC-721 token simulation for marketplace

contract PropertyNft is ERC721, ERC721Burnable, Ownable {
    string public i_uri = "";
    uint256 private s_tokenCounter;
    address private initialOwner;

    event PropertyMinted(uint256 indexed tokenId, address indexed to);

    constructor(
        address _initialOwner
    ) ERC721("PropertyNft", "PNFT") Ownable(_initialOwner) {
        s_tokenCounter = 0;
        initialOwner = _initialOwner;
    }

    function mint(uint256 tokeId, address to) public {
        _safeMint(msg.sender, tokeId, "");
        emit PropertyMinted(tokeId, to);
        s_tokenCounter++;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        if (_ownerOf(tokenId) == msg.sender) {
            return i_uri;
        } else {
            revert PropertyNft__NonexistentToken(tokenId);
        }
    }

    function nftBurn(uint256 tokenId) public {
        if (
            _requireOwned(tokenId) == initialOwner &&
            ownerOf(tokenId) != msg.sender
        ) revert PropertyNft__NonexistentToken(tokenId);
        _burn(tokenId);
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
