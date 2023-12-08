// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;



error Marketplace__OnlyMarketplaceCanCallThisFunction(address caller);
error Marketplace__PropertyNotListed(address nftAddress, uint256 tokenId);

contract Marketplace {
    /// @title Marketplace
    /// @author Olivier Kobialka
    /// @notice Contract for ERC-20 and ERC-721 token simulation for the marketplace
    
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
        address newOwner
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

    /// @notice Structure for listed items
    struct Listing {
        uint256 quantity;
        address payToken;
        uint256 pricePerItem;
        uint256 startingTime;
    }

    /// @notice NftAddress -> Token ID -> Owner -> Listing item
    mapping(address => mapping(uint256 => mapping(address => Listing)))
        public listings;

    uint16 public marketplaceFee;
    address payable public feeRecipient;

    modifier onlyMarketplace() {
        require(
            msg.sender == address(this),
            "Marketplace__OnlyMarketplaceCanCallThisFunction"
        );
        _;
    }

    modifier notListed(
        address _nftAddress,
        uint256 _tokenId,
        address _owner
    ) {
        Listing memory listing = listings[_nftAddress][_tokenId][_owner];
        require(listing.quantity == 0, "Marketplace__PropertyNotListed");
        _;
    }

    /// @notice Contract Initialization
    function initialize(
        address payable _feeRecipient,
        uint16 _marketplaceFee
    ) external {
        marketplaceFee = _marketplaceFee;
        feeRecipient = _feeRecipient;
    }

    /// @notice Method for listing a property
    function listProperty(
        address _nftAddress,
        uint256 _tokenId,
        address _payToken,
        uint256 _price,
        uint256 _startedAt
    ) external notListed(_nftAddress, _tokenId, msg.sender) {
        // Add your listing logic here
        emit PropertyListed(msg.sender, _nftAddress, _tokenId);
    }

    ////////////////////////////
    /// Internal and Private ///
    ////////////////////////////

    function _cancelListing(
        address _nftAddress,
        uint256 _tokenId,
        address _owner
    ) private {
        // Add your cancellation logic here
        emit PropertyCanceled(_owner, _nftAddress, _tokenId);
    }
}
