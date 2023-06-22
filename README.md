# Interview exercise for BookOutdoors

My code for challenge A.  

## Tech Used

- Node.js, TypeScript, SQLite, prisma.io

## Requirement Fullfilled

* Screenshots of query output in the output folder
* Database file in dev.db
* Diagram in ERD.svg

## Takeaways

* First time working with prisma.io, great tool but may have taken up a bit more of the time limit than expected
* Did not populate credits/cast due to time limit

## Potential Improvement

* Batched writes of data instead of sequential
* Did not populate credits/cast due to time limit

## Build and run the project

Populate database:

```
$ npm run gen
```

Run the queries:

```
$ npm run dev
```

# Challenge C - Brief Comments

* FrontEnd
    * Use of a CDN like Cloudfront to enable fast access to assets through caching
* Backend
    * Caching of frequently used data in memory
    * Containerization
        * Allow pre/post processing of your services
        * Scalablity and concurency of services
    * Realtime Data Streams to handle queuing, batching, and retry functionality for the data pipeline
* Database
    * NoSql allows for greater scalablity and faster writes, but tradeoffs are requiring greater developer discipline and more limited ablity to query that data