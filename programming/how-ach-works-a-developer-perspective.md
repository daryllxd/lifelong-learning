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

