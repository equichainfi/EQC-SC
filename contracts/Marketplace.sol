// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/// @title Marketplace
/// @author Olivier Kobialka, 2023
/// @notice Contract for ERC-20 && ERC-721 token simulation for marketplace

error Marketplace__OnlyMarketplaceCanCallThisFunction(address caller);
error Marketplace__PropertyNotListed(address nftAddress, uint256 tokenId);

contract Marketplace {
    //////////////////////////
    /// Events Declaration ///
    //////////////////////////
    event PropertyListed(
        address indexed owner,
        address indexed nft,
        uint256 tokenId
    );
    event PropertySold(
        address indexed seller,
        address indexed buyer,
        address indexed nft,
        uint256 tokenId,
        uint256 price,
        uint256 fee
    );
    event PropertyUpdated(
        address indexed owner,
        address indexed nft,
        uint256 tokenId,
        uint256 newPrice,
        address newOwner,
    );
    event PropertyCanceled(
        address indexed owner,
        address indexed nft,
        uint256 tokenId
    );
    event OfferCreated(
        address indexed creator,
        address indexed nft,
        uint256 tokenId,
        uint256 price
    );
    event OfferCanceled(
        address indexed creator,
        address indexed nft,
        uint256 tokenId
    );

    uint16 public marketplaceFee;
    address payable public feeRecipient;

    modifier onlyMarketplace() {
        if (msg.sender != address(this)) {
            revert Marketplace__OnlyMarketplaceCanCallThisFunction(
                msg.sender
            );
        }
        _;
    }

    modifier notListed(
        address _nftAddress,
        uint256 _tokenId,
        address _owner,
    ) {
        Listing memory listing = listings[_nftAddress][_tokenId];
        if (listing.quantity == 0) {
            revert Marketplace__PropertyNotListed(_nftAddress, _tokenId);
        }
    }

    /// @notice Contract Initialization
    function initialize(
        address payable _feeRecipient, uint16 _marketplaceFee
    ) public initializer {
        marketplaceFee = _marketplaceFee;
        feeRecipient = _feeRecipient;


    }

    /// @notice Method for listing a property
    function listProperty(
        address _nftAddress,
        uint256 _tokenId,
        address _payToken,
        uint256 _price,
        uint256 _expiresAt,
        uint256 _startedAt
    ) external notListed(
        _nftAddress,
        _tokenId,
        msg.sender
    ) {
        
    }

    ////////////////////////////
    /// Internal and Private ///
    ////////////////////////////

    function _cancelListing(
        address _nftAddress,
        uint256 _tokenId,
        address _owner
    ) private {}
}
