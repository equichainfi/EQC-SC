// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { EIP712 } from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import { ERC721Burnable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ERC721Votes } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol";

error PropertyNft__NonexistentToken(uint256 tokenId);

/// @title PropertyNft
/// @author Olivier Kobialka, 2023
/// @notice Contract for basic ERC-721 token simulation for marketplace

//todo: fix EIP712 signature from unique
contract PropertyNft is ERC721, EIP721, ERC721Burnable, Ownable, ERC721Votes {
    string public i_uri = "";
    uint256 private s_tokenCounter;
    address private initialOwner;
    string private s_name;
    string private s_symbol;

    event PropertyMinted(uint256 indexed tokenId, address indexed to);

    constructor(
        address _initialOwner,
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) Ownable(_initialOwner) EIP712(_name, "1") {
        s_tokenCounter = 0;
        initialOwner = _initialOwner;
        s_name = _name;
        s_symbol = _symbol;
    }

    function mint(uint256 tokenId, address to) public {
        _safeMint(msg.sender, tokenId, "");
        emit PropertyMinted(tokenId, to);
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

    function nftBurn(uint256 tokenId) public returns (bool) {
        if (
            _requireOwned(tokenId) == initialOwner &&
            ownerOf(tokenId) != msg.sender
        ) revert PropertyNft__NonexistentToken(tokenId);
        _burn(tokenId);
        return true;
    }

    function getTokenCounter() public view returns (uint256 tokenCounter) {
        return s_tokenCounter;
    }

    function update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Votes) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Votes) {
        super._increaseBalance(account, value);
    }
}
