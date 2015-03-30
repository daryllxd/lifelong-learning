## How ACH works: A developer perspective - Part 1
[link](http://engineering.zenpayroll.com/how-ach-works-a-developer-perspective-part-1/)

The Automatic Clearing House (ACH) network is the primary way money moves electronically through the banking system today. When a company runs payroll, Zen will use the ACH network to debit the company's account to fund their employee's pay. When Zen receives the funds from the company, they again use the ACH network to initiate credits into each of the employee's accounts to pay them.

*In order to initiate an ACH credit or debit on someone's bank account, you first need to find a bank who is willing to proxy these transactions on your behalf.* Only banks are allowed to initiate ACH transaction directly. You’ll need to open a business account with a bank and request the ability to originate — the technical term for send — ACH transactions through them. If they agree, they’ll become your ODFI, which stands for “Originating Depository Financial Institution,” but really it's just a fancy term for “bank”.

ODFI will set up an FTP server where you'll upload ACH files. They basically have information about who you want to debit from or credit to, and the amount of the transaction. This is sent to the Federal Reserve. Once this goes through, the Federal Reserve will tell Alice's bank that an ACH transaction was originated on Alice's account, and Alice's bank will debit or credit her account accordingly. Alice's bank (the receiver) is called the "Receiving Depository Financial Institution".

#### Reasons why an ACH file can get returned:

1. Non-sufficient funds (NSF): The bank account we're trying to debit does not have enough money.
2. Invalid account number. Routing/account number does not exist.
3. Payment stopped. The owner of the bank account we're trying to credit/debit told their bank they did not authorize this transaction.

#### Scenario: Crediting from Alice, Alice has NSF.

Note: *When the OFDI increments our balance, it actually doesn't know if Alice has funds or if the account even exists.* This is why finding a bank willing to be your ODFI is not easy! When Alice's bank receives the ACH file from the Federal Reserve the following day, they generally have 24 hours after that to tell the Federal Reserve whether or not the payment should return. (If invalid account number, they usually don't take that long, but if NSF, then the bank may wait for the entire 24 hours to see if the customer deposits money into their account before then.

Once the RDFI notifies the Federal Reserve that they are rejecting an ACH file, they upload an "ACH Reutrn" file to the Federal Reserve. The contents of the return file say which part of the ACH file they are rejecting and the reason for rejection.

That evening, our OFDI will check in with the Federal Reserve to see if there are any ACH return files waiting for them. If there are, our ODFI will download the files, and then forward them to us by placing the file in the same SFTP server we originated the ACH file from. At the same time our ODFI will decrement our account by $100 to take back the money they originally credited us for. For record keeping, we'll see a debit of $100 on our bank statement with the description "ACH Return".

*It's our job to to check the SFTP server every day, download and parse all the ACH response files, and update our systems when an ACH file gets returned.* For example, at ZenPayroll, if we originated an ACH debit because a company ran payroll, we'll cancel that payroll if the ACH file gets returned.

#### Change Requests

If ACH returns are the developer's equivalent of an "error", ACH change requests are "warnings".

Sometimes, we will send an ACH file that isn't quite right, but is close enough for the RDFI to understand and process. In this case, the ACH transaction will go through, but the RDFI will upload an "ACH Change Request" file to the Federal Reserve, which then gets placed into our SFTP server through our ODFI. The change request file contains the correct information that we should have used in the ACH file. It's our job to check the SFTP server, parse the change request file, and update our system so that the next time we submit an ACH file to the RDFI, it contains the correct information.

#### Reasons for an ACH Change Request

1. Incorrect name of account holder.
2. Savings/Checking selection switched -- We said we wanted to debit a checking account, when in fact the account is a savings account.
3. Incorrect account number -- We used the wrong bank account number, but we were close enough that the bank knew which account we actually meant to use (perhaps through a checksum).

*It's important to note that ACH is not a real-time system. Rather, things are processed in batches at 6:30pm EST, 12:30am EST, and 3:00am EST. As a result, funds can take days to settle.*

#### Timing of the ACH transfers

*Leg1: Originator -> OFDI (our bank) by Day1, 7:00pm.*

Banks will ask you to SFTP your ACH file to them by a certain time for processing (referred to as the ACH cut-off time). Once the 7pm deadline hits, our bank will validate that our ACH files pass a series of sanity checks, and they'll take steps to verify taht the files came from us.

*Leg 2: ODFI -> Federal Reserve -> RDFI by Day 2, 12:01am.*

Once our bank has deemed our ACH file acceptable, they'll forward the ACH file to the Federal Reserve for processing. *The ACH protocol is a next-day settlement system. That means that ACH debit requests sent to the Federal Reserve are processed around midnight and made available to the RDFI (receiving bank) around the same time.*

*Leg 3: RDFI -> Receiver by Day 2, ~5:00am.*

The receiving bank will pick up the notification of the credit sometime in the morning when they open for business (let's say 5am for simplicity's sake) and will decrement the funds in their customer's account at that time.

*As you can see, timing for non-returned ACH transfers is quite straightforward: ACH files originated before 7pm are settled the following morning.*

#### ACH Returns

*Leg 4: RDFI -> Federal Reserve -> ODFI by Day 4, 12:01am.*

*When the RDFI receives word of the ACH debit at the start of day 2, they are given until the end of the next business day to tell the Federal Reserve that they want to return the ACH debit.* Sometimes, a bank moves quickly and will notify the Federal Reserve by the end of the same day. Most of the time, however, the banks will notify the Federal Reserve as late as possible, which is the end of day 3.

Once the Federal Reserve receives a return, they will let ODFI know that the ACH debit was returned that evening.

There is a notable exception to the next-day deadline: If the customer notifies the bank that they did not authorize the ACH debit (for example, in the case of a fraudster using a stolen bank account), the RDFI is allowed 60 days to return the ACH debit. Because of this, the ACH protocol is very consumer friendly, since the originator of the ACH debit must now return the money they debited and try to get back whatever was given in return for the debit.

*Leg 5: ODF -> Originator by Day 4, ~5:00am.*

The ODFI bank will pick up the notification of the return sometime in the morning when they open for business  and will forward it on to the originator. *It's important to note that the ACH system never provides positive confirmation that an ACH debit has gone through successfully. THE ONLY RESPONSE AN ACH ORIGINATOR MAY GET IS ON NOTIFYING THEM OF A RETURN.* Because of this "no news is good news" policy, it is wise for originators of ACH debits to wait for 3 additional business days of "no news" to ship their product to the customer.

Though the ACH system is described as a next-day settlement system, in practice, it is not because of this.

An addendum to the ACH protocol to support same-day ACH settlement is something that is almost unanimously desired by the ACH community. The good news is that NACHA, the governing organization behind ACH, has recently announced plans to roll out a same-day ACH protocol. The challenge is coordinating the adoption of the new protocol across all participating banks. Once fully implemented, the same-day ACH system would likely cut one day from the timelines outlined here.
