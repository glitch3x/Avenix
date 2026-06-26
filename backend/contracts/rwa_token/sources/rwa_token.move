module rwa_token::rwa_token {
    use std::option;
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    /// The type identifier of coin. The coin will have a ticker, name and description.
    public struct RWA_TOKEN has drop {}

    /// Module initializer is called once on module publish.
    fun init(witness: RWA_TOKEN, ctx: &mut TxContext) {
        let (treasury, metadata) = coin::create_currency(
            witness,
            6,                // decimals
            b"RWA",           // symbol
            b"Real World Asset", // name
            b"Tokenized Real World Asset", // description
            option::none(),   // icon url
            ctx
        );

        // transfer the treasury cap to the sender, so they can mint and burn
        transfer::public_transfer(treasury, tx_context::sender(ctx));
        
        // share the metadata so everyone can read the coin properties
        transfer::public_share_object(metadata);
    }

    /// Manager can mint new coins
    public entry fun mint(
        treasury_cap: &mut TreasuryCap<RWA_TOKEN>, amount: u64, recipient: address, ctx: &mut TxContext
    ) {
        coin::mint_and_transfer(treasury_cap, amount, recipient, ctx)
    }

    /// Manager can burn coins
    public entry fun burn(treasury_cap: &mut TreasuryCap<RWA_TOKEN>, coin: Coin<RWA_TOKEN>) {
        coin::burn(treasury_cap, coin);
    }
}
