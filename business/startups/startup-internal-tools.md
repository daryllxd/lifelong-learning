## This Startup Built Internal Tools to Fuel Major Growth — Here's Their Approach
[link](http://firstround.com/article/This-Startup-Built-Internal-Tools-to-Fuel-Major-Growth-Heres-Their-Approach)

Noah Brier wanted to involve engineers earlier in the product design process to keep things innovative and agile. He built a tool that would automatically route relevant info to the right people.

*"If you're running a product company, your number one job is to get everyone thinking about products."*

Internal tools aren't only important to getting work done faster--they reinforce the company's mission. Everyone, from sales to marketing to operations--should be thinking about how products work and what makes them better.

If you're a sales person, the email that you send out to prospects could count as a product you could easily automate, saving you all the time you might spend rewriting it again and again. If everyone is thinking in terms of products, they're more likely to find easier, optimal solutions for their everyday work.

*When you automate  things, you're basically assuring that something will work exactly the way you inteneded it to work. A process is communicated, a tool is programmed. A tool takes the guesswork out of whatever you're doing.*

*80% of running a growing company is taking the same action over and over again.* The more you can automate, the more bandwidth you can devote to the areas where a tool can't help. You want to give people the most time and space in the areas that really make a difference, not how and when something is put on a staging server to get reviewed before it's deployed.

Barista: a knowledge exchange platform that allows anyone in the organization to ask a question so that it gets routed to the right people who can respond easily over email. Product changes are happening and the business side needs to stay on top of them. It's a central problem for every growing company, and automating this keeps it top of mind for everyone.

Phaser: Supports the product development workflow, interacting with Github, HipChat, and Asana, moving tasks through all their phases of development on every platform as things move forward. When code is ready for review, a request gets automatically opened in Github and Phaser associates it through.

*"Tools ensure that every part of every product gets the thought and review that it needs before it is released."*

"I would say that any product company should be a tools-based company from the very beginning," says Brier. "If engineering is at the center of what you do, you want to make things systemic. Systemic improvements make big changes possible. Process improvements may or may not be effective." True to this statement, Percolate launched its first internal tools between 5 and 10 employees.

*"If you plan to grow, you don't want politics. You don't want an over-processed workplace. You've got to think about how you’re going to scale the ways you work. Tools are at the center of that. And from that perspective it's worth the resources."*

At the same time, depending on your company's objective, it might be possible to one day turn internal tools into customer-facing products. Having your entire company as a focus group has rare advantages: you get feedback from a highly-motivated group of detail-oriented people who you respect, and who are incentivized to put out the best product possible.

*If you want robust internal tools, founders should be involved in building them from scratch, even if they don't have engineering prowess.*

When you're deciding to invest in this sort of thing, you have to think about the employee who works at your company now, but you also have to think about the employee who's going to work there in two weeks.

"If something isn't automated as part of a tool, you're going to have to keep communicating it over and over again."

#### Building Internal Tools

As Percolate's growth picked up pace, Brier and his team saw the need for a central repository of knowledge that would scale with the company and facilitate the interactions people used to have when they were sitting next to each other. No existing tools seemed to be able to accomplish both. So, they decided to bring in an outside developer who could make Brier's wireframes a reality. Through this experience, he learned several tactics that he knows made Barista a success — and that can work for other internal tools.

1) Put them smack in the middle of existing workflows. “The single most important choice we made with Barista was to integrate it with email,” says Brier. Initially, the tool existed only in a web interface, but it became vital to the company when it started routing queries and answers to and from employees’ inboxes. “Email was already widely used by everyone. When we made it possible for people to reply to questions on Barista straight from their email, we saw many more people using it.”

Barista's strength was that it would allow the people interacting with customers every day to funnel questions to product and then send answers back to users very quickly. Eventually, to make this even easier, the internal tools team integrated Barista and Salesforce. That way, whenever a new question came in from customers, it could be logged on Salesforce but automatically pushed to product on Barista. The product team would get notified every time a new question came in, and the software would send a digest of questions and answers to everyone at the company at the end of the day. This kept everyone in the know without them breaking their workflow.

Another key part of this was using Google App Engine to power single sign-on for all employees. This allowed them to access Barista with the same credentials as their email, removing even more friction.

2) As soon as a tool has traction, build out APIs. "If you don't think ahead in this area, you’ll spend a lot of time backtracking to build APIs so you can exploit all these opportunities for integration." For example, Percolate had to circle back to create a Barista API to make Salesforce integration possible. "Now we’re thinking about mobile too, and we need APIs for that. As soon as you realize a tool is getting used and it could be used to answer more diverse challenges, build out those APIs."

3) Don't let product engineering work on internal tools. “For Percolate, it was important to be religious about this split,” says Brier. “When you’re small and trying to build a company — and even when you’re bigger and diversifying what you’re doing — you need the product engineers to work on the product you’re delivering to customers 100% of the time. Don't lose sight of the fact that that's how you’re making money — money you can use to hire people focused entirely on internal tools.” Of course, product engineers should be involved in providing feedback and fueling innovation in this area, but not actually building tools that aren't specifically for them.

All of our client-facing products run on AWS, but we've chosen App Engine for internal tools because there isn't too much infrastructure around what you build and deployment is so easy.

