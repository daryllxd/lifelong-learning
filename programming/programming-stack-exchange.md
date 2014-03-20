## Data migration - dangerous or essential?
[Link](http://programmers.stackexchange.com/questions/50703/data-migration-dangerous-or-essential)

> The background is that our customers are using a large amount of data with poor quality. The reasons for this is only partially related to our software quality, but rather to the history of the data: Most of them have been migrated from predecessor systems, some bugs caused (mostly business) inconsistencies in the data records or misentries by accident on the customer's side (which our software allowed by error).

#### Alain Pannetier

- One strategy we use do migrate 100% of our customer's data is asymptotic data cleansing pre-migration tools.
- This means developing tens of data-sanity checks (mostly sql queries).
- Exchanging cleansing tools with the customer (since that's his data, we design the patching utilities, he validates them and executes them).
- Refining the tool over iterations and reaching KPI-backed measurable quality asap.
- Checking data consistency after the migration has happenned. This helps to make GO/NOGO decision on D-Day.
- In the end a data migration is an immensely beneficial exercise that has to happen after 3 to 5 years.
- It allows to boost the platform's ability to support business.
- It allows to streamline the database.
- It prepares the IT platform for next generation business tools (ESB/EAI, Portals, Self-Care platforms, reporting and data mining, you name it).
- It reorganises DIY data flows between platforms that have accumulated over the years in a quick and dirty "temporary" way to fulfil "urgent requirements".
- *Above all it empowers the IT production team who come to know their platform better and foster 'can-do' attitudes.*
- Another fundamental consideration is that nowadays, customer expectations are always on the move, as in "customers are always more demanding". So that there will always be a significant proportion of a given company's competitors on the lookout for these new trends with the obvious intent to increase their market share. *If your IT platform is too rigid, it will be a drag on your own aptitude to spouse or precede the market trends on your own side and, ultimately to maintain your own market share. In other words, in a moving market inertia is a recipe for irrelevance.*
- In contrast, a data migration to a newer system will roll out a more modern and more versatile productivity tool, making the best of newer technologies, more attractive to employees and this in turn, will contribute to support or even lead the company's internal innovation process, thereby securing or increasing its relative market share.

Yes Data Migrations are essential, but are they also dangerous ? On this account, many things in IT are dangerous then.

#### Isaac A. Nugroho

As a guide, there are four big processes that should be take into consideration in data migration:

1. Data mapping. Maps of master (and their combination) to the new system
2. Data clean up. Maps of exception in the data, that is, data whose combination is considered invalid on the new system. If possible, deal with business to exclude data which have no way to be mapped and potentially break the new system, and prepare workaround
3. Actual data migration. The are many strategies to perform data migration. For example: big bang, incremental
4. Report consolidation. Should both system run in parallel, how to produce correct and consistent report.

#### HLGEM

If the data you plan to migrate is currently bad, it needs to be fixed whether you do a migration or not. Bad data = useless data.

- You should always have a way to go back to the system as it is now. 
- Do it on the test servers first.
- All code for the migration should be in source control.
- You need requirements and test plans before your start the migration. You need to know that if you had 1,293,687 records in the old system, that you have the same in the new or you know where they went (to an exception table perhaps). If you are normalizing a denormalized scheme, you need to calculate how many records you should end up with before you start and then check that. You need documentation that specifies what the mappings from one system to the other are. This will help your QA people check to see that the data went to the right place.
- You need to determine how to handle the current bad data. What can be cleaned, what might need a value in a required field that says 'Unknown', what should be tossed out to an exception table, what needs manual intervention by a group of users (deciding if these two people are really a dup or are there two doctors in that practice with the same name for instance and if it is a dup which data to choose when the two records differ, etc.).
- The key to a successful migration is planning. I have found that planning (which includes writing the test cases and unit tests) usually takes more time than the actual development.
- The next key to a successful data migration is QA. This is not a project to throw at the QA team the day before launch. This is not a project to launch when QA says there is a problem.
- Another key to a successful migration is to deploy the majority of the data and test it while the orginal system is still running.
- If the migration involves a new user interface, please get the actual users to use it as part of the migration testing. Then train the other users before you go live (but less than a week before you go live or they will forget).
- Look at what is wrong with the current data, can you add foreign keys, constraints, triggers, business rules in the application, default values, etc. in order to avoid this being bad in the future? When you clean bad data, you also need to create a way to avoid that simliarly bad data getting in in the future.

## What technical details should a programmer of a web application consider before making the site public?

- Test Gecko (Firefox), Webkit (Safari), Chrome, IE, Opera.
- Staging site
- `rel="nofollow"` to user email addresses.
- Rate limiting
- Progressive enhancement
- Redirect after POST
- OWASP security guide
- 



## How to respond when you are asked for an estimate?

- Determine the accuracy that you need. Based on the duration, you can quote the estimate in different precision. Saying "5 to 6 months" is different than saying "150 days". If you slip a little into the 7th month, you're still pretty accurate. But if you slip into the 180th or 210th day, not so much.
- Model the system. A model might be a mental model, diagrams, or existing data records. Decompose this model and build estimates from the components. Assign values and error ranges (+/-) to each value.
- Never off-the-cuff it.
- "I do not have enough information right now. It would be a disservice to us both for me to make something up on the spot."
- Bottom up is best. Get a detailed work breakdown, estimate each component then roll it up into a larger number. I find planning poker to be a great technique here.
- State your assumptions. Validate as many as possible given the time frame.
- State explicitly what is included and excluded in the estimate. For example, is review included? Are technical delays included?
- Confidently. I can't tell you how many times I botched up an initial meeting with a client by not putting on professionalism when giving an estimate. Even if you're blowing numbers out of thin air - make sure you always keep some estimate around. That said, be careful not to estimate yourself into a hole.
