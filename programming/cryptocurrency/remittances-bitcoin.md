# Bitcoin Remittances

- Phil remittances: multiple corridors/multiple countries.
- Use case: instant settling. Also, no need to open offices/regulatory requirements in other countries.
- Migrant workers don't care about it, they just want the thing to solve money.
- Last mile: HK Dollar -> BTC -> PHP, faster than HK D -> USD -> PHP.
- Mechanics
  - Need to have a lot of access to bitcoins.
  - Access to an exchange with locally available pay-in methods and low trading fees.
  - (Off-ramp) Able to pay out, even if prices are fluctuating. In poor countries.
  - Hard to get licenses to be a "Money Transfer Operator."

## Chapter Two, The Invisible Bitcoin Solution

- First mile: From visiting a shop, there is now a thing in Korea where you just chat with the agent over the phone, and provide the details of their recipient there.
  - `Payphil` in Korea: Manages KYC processes for their sending customers. They may set amount threshold, daily/monthly limits, etc.
  - Bloom: Facilitator before we do a jump-off to the Philippines.
- Last Mile:
  - Pickup = pawnshops, logistics companies.
  - Bloom: Is the Last Mile provider for the Philippines.
- Settlement:
  - In practice, remittance businesses would prefer to pre-fund their balances with Bitcoin, allowing them to only perform a few large funding transactions per day, instead of small ones.
  - Better than wiring money.
- With more nodes in the network, it becomes less necessary to liquidate BTC for local currency.

## Chapter Three: Does the BTC Price Matter?

- Bloom has to pre-fund payout channels in order to make disbursements faster. PHP is usually never being forwarded, it's already there.
- By liquidating as soon as you receive the BTC, it doesn't.

## Chapter Four: Bitcoin Regulation Around the World

- KYT: "Know Your Transaction".

## Chapter Eleven: Why Doesn't Western Union Use Bitcoin?

- They don't really need to, while Bitcoin is still small.
- Both the sending and receiving sides are owned by WU, so the settlement doesn't need to take place over the blockchain.
- WU is massive enough that it can benefit from its own "network effect".
- No need to move money, it just draws from its reserves in each country that it's in.
- The Bloom Web Application
  - Create/manage agents/sender/recipients/transactions, calculate transaction fees.
