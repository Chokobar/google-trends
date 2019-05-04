const googleTrends = require('google-trends-api');
const mail = require('./mail');

// options
const mailOptions = {
    from: 'formus.contact@gmail.com',
    to: 'jaychokobar@gmail.com',
    subject: 'Google Trend Daily Update: ' + new Date(),
    html: '<b>Test mail</b>'
}

// Parameters
const HL = 'TH';
const GEO = 'TH';
const TIMEZONE = 420;

let dailyTrends = ''; // template: dailyTrends += `<b></b><p>${}</p>`

// dailyTrends
googleTrends.dailyTrends({geo: GEO, hl: HL, timezone: TIMEZONE})
    .then((results) => {
        const data = JSON.parse(results);
        data.default.trendingSearchesDays.forEach(element => {
            // console.log('#########################');
            // console.log('Date: ' + element.formattedDate);
            dailyTrends += `<b>Date: </b><span>${element.formattedDate}</span><p></p>`

            element.trendingSearches.forEach(element => {
                // console.log('Query: ' + element.title.query);
                // console.log('Traffic: ' + element.formattedTraffic);
                dailyTrends += `<b>Query: </b><span>${element.title.query}</span><p></p>`
                dailyTrends += `<b>Traffic: </b><span>${element.formattedTraffic}</span><p></p>`

                if (element.relatedQueries.length > 0 && element.relatedQueries) {
                    // console.log('Relate Queries');
                    dailyTrends += `<b>Relate Queries</b>`
                    element.relatedQueries.forEach(relateQuery => {
                        // console.log(relateQuery.query)
                        dailyTrends += `<p>${relateQuery.query}</p>`
                    });
                }
                dailyTrends += `<b>Articles</b><p></p>`
                element.articles.forEach(element => {
                    if (element.image) {
                        // console.log('Title: ' + element.title);
                        // console.log('TimeAgo: ' + element.timeAgo);
                        // console.log('Source: ' + element.image.source);
                        // console.log('Url: ' + element.image.newsUrl);
                        dailyTrends += `<b>Title: </b><span>${element.title}</span><p></p>`
                        dailyTrends += `<b>TimeAgo: </b><span>${element.timeAgo}</span><p></p>`
                        dailyTrends += `<b>Source: </b><span>${element.image.source}</span><p></p>`
                        dailyTrends += `<b>Url: </b><span>${element.image.newsUrl}</span><p></p>`
                    }
                });
                // console.log('#########################');
                dailyTrends += `<p>-------------------------</p>`;
            });
        });
        mailOptions.subject = 'Daily Trends';
        mailOptions.html = dailyTrends;
        mail.sendingMail(mailOptions);
    })
    .catch((err) => {
        console.log(err);
    });


// Categories
const CAT_ALL = 'all';
const CAT_ENTERTAINMENT = 'e';
const CAT_BUSINESS = 'b';
const CAT_SCIANDTECH = 't';
const CAT_HEALTH = 'm';
const CAT_SPORTS = 's';
const CAT_TOPSTORIES = 'h';

let realtimeTrends = ''; // template: realtimeTrends += `<b></b><p>${}</p>`

// realtimeTrends
googleTrends.realTimeTrends({geo: 'US', category: CAT_ALL})
    .then((results) => {
        const data = JSON.parse(results);
        if (!data.storySummaries.trendingStories) return console.log('no returning results');

        data.storySummaries.trendingStories.forEach(element => {
            // console.log('Title: ' + element.title);
            realtimeTrends += `<b>Title: </b><span>${element.title}</span><p></p>`
            // console.log('Entity Names: ')
            realtimeTrends += `<b>Entity Names: </b>`
            element.entityNames.forEach(element => {
                // console.log(element);
                realtimeTrends += `<p>${element}</p>`
            });
            if (element.image) {
                // console.log('Source: ' + element.image.source);
                // console.log('Url: ' + element.image.newsUrl);
                realtimeTrends += `<b>Source: </b><span>${element.image.source}</span><p></p>`
                realtimeTrends += `<b>Url: </b><span>${element.image.newsUrl}</span><p></p>`
            }
            element.articles.forEach(element => {
                if (element.image) {
                    // console.log('Title: ' + element.title);
                    // console.log('TimeAgo: ' + element.timeAgo);
                    // console.log('Source: ' + element.image.source);
                    // console.log('Url: ' + element.image.newsUrl);
                    realtimeTrends += `<b>Title: </b><span>${element.title}</span><p></p>`
                    realtimeTrends += `<b>TimeAgo: </b><span>${element.timeAgo}</span><p></p>`
                    realtimeTrends += `<b>Source: </b><span>${element.image.source}</span><p></p>`
                    realtimeTrends += `<b>Url: </b><span>${element.image.newsUrl}</span><p></p>`
                }
            });
            // console.log('###############################');
            realtimeTrends += `<p>-------------------------</p>`;
        });
        mailOptions.subject = 'Real time Trends';
        mailOptions.html = realtimeTrends;
        mail.sendingMail(mailOptions);
    })
    .catch((err) => {
        console.log(err);
    });

// realtimeTrends Business
googleTrends.realTimeTrends({geo: 'US', category: CAT_BUSINESS})
    .then((results) => {
    const data = JSON.parse(results);
    if (!data.storySummaries.trendingStories) return console.log('no returning results');

    data.storySummaries.trendingStories.forEach(element => {
        // console.log('Title: ' + element.title);
        realtimeTrends += `<b>Title: </b><span>${element.title}</span><p></p>`
        // console.log('Entity Names: ')
        realtimeTrends += `<b>Entity Names: </b>`
        element.entityNames.forEach(element => {
            // console.log(element);
            realtimeTrends += `<p>${element}</p>`
        });
        if (element.image) {
            // console.log('Source: ' + element.image.source);
            // console.log('Url: ' + element.image.newsUrl);
            realtimeTrends += `<b>Source: </b><span>${element.image.source}</span><p></p>`
            realtimeTrends += `<b>Url: </b><span>${element.image.newsUrl}</span><p></p>`
        }
        element.articles.forEach(element => {
            if (element.image) {
                // console.log('Title: ' + element.title);
                // console.log('TimeAgo: ' + element.timeAgo);
                // console.log('Source: ' + element.image.source);
                // console.log('Url: ' + element.image.newsUrl);
                realtimeTrends += `<b>Title: </b><span>${element.title}</span><p></p>`
                realtimeTrends += `<b>TimeAgo: </b><span>${element.timeAgo}</span><p></p>`
                realtimeTrends += `<b>Source: </b><span>${element.image.source}</span><p></p>`
                realtimeTrends += `<b>Url: </b><span>${element.image.newsUrl}</span><p></p>`
            }
        });
        // console.log('###############################');
        realtimeTrends += `<p>-------------------------</p>`;
    });
    mailOptions.subject = 'Real time Trends Business';
    mailOptions.html = realtimeTrends;
    mail.sendingMail(mailOptions);
    })
    .catch((err) => {
    console.log(err);
    });