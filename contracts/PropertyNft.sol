// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

error PropertyNft__NonexistentToken(uint256 tokenId);

/// @title PropertyNft
/// @author Olivier Kobialka, 2023
/// @notice Contract for basic ERC-721 token simulation for marketplace

contract PropertyNft is
    ERC721,
    ERC721URIStorage,
    ERC721Pausable,
    Ownable,
    ERC721Burnable,
    EIP712,
    ERC721Votes
{
    uint256 private s_tokenCounter;
    string public i_uri = "";
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

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = s_tokenCounter++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Pausable, ERC721Votes) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Votes)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
