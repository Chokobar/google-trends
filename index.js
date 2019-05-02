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
            dailyTrends += `<b>Date</b><p>${element.formattedDate}</p>`

            element.trendingSearches.forEach(element => {
                // console.log('Query: ' + element.title.query);
                // console.log('Traffic: ' + element.formattedTraffic);
                dailyTrends += `<b>Query</b><p>${element.title.query}</p>`
                dailyTrends += `<b>Traffic</b><p>${element.formattedTraffic}</p>`

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
                        dailyTrends += `<b>Title</b><p>${element.title}</p>`
                        dailyTrends += `<b>TimeAgo</b><p>${element.timeAgo}</p>`
                        dailyTrends += `<b>Source</b><p>${element.image.source}</p>`
                        dailyTrends += `<b>Url</b><p>${element.image.newsUrl}</p>`
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
            realtimeTrends += `<b>Title</b><p>${element.title}</p>`
            // console.log('Entity Names: ')
            realtimeTrends += `<b>Entity Names</b>`
            element.entityNames.forEach(element => {
                // console.log(element);
                realtimeTrends += `<p>${element}</p>`
            });
            if (element.image) {
                // console.log('Source: ' + element.image.source);
                // console.log('Url: ' + element.image.newsUrl);
                realtimeTrends += `<b>Source</b><p>${element.image.source}</p>`
                realtimeTrends += `<b>Url</b><p>${element.image.newsUrl}</p>`
            }
            element.articles.forEach(element => {
                if (element.image) {
                    // console.log('Title: ' + element.title);
                    // console.log('TimeAgo: ' + element.timeAgo);
                    // console.log('Source: ' + element.image.source);
                    // console.log('Url: ' + element.image.newsUrl);
                    realtimeTrends += `<b>Title</b><p>${element.title}</p>`
                    realtimeTrends += `<b>TimeAgo</b><p>${element.timeAgo}</p>`
                    realtimeTrends += `<b>Source</b><p>${element.image.source}</p>`
                    realtimeTrends += `<b>Url</b><p>${element.image.newsUrl}</p>`
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
