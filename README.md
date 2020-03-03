# Phinestry

---

# What it does

Allows anyone to accurately see when they should buy or sell a stock.

# How we built it

Setup an express server to render our static website on GCP's app engine. Inside out application we have triggers for a variety of cloud functions which would handle all data migration from a given API to our database on cockroachdb. We even setup firebase to mock a session storage while the user is scoping around on the site.

# Challenges I ran into

The internet took a huge toll on us since all of our work relies on cloud and API services. Besides that we are a group of 2 so trying to do everything in the time and come up with an idea on the spot took longer than anticipated.

# Accomplishments that I'm proud of

Finding comparisons between the Goldman Sachs API and BlackRock API, which in turned allowed us to connect them into one cohesive.

# What we learned

We learned how to navigate different apis, find comparisons multiple apis together and parse for specific data. While analyzing stock data from companies that have been active for over a year.

# What's next for Phinestry

To continue to enhance our prediction model and provide free estimations of stock prices.
