const googleTrends = require('google-trends-api');
const mail = require('../mail');

// options
const mailOptions = {
    from: 'formus.contact@gmail.com',
    to: 'jaychokobar@gmail.com',
    subject: 'Google Trend Daily Update: ' + new Date(),
    html: '<b>Test mail</b>'
}

let realtimeTrends = ''; // template: realtimeTrends += `<b></b><p>${}</p>`

googleTrends.realTimeTrends({geo: 'US', category: 'e'})
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
        mailOptions.subject = 'Real Time Trends Entertainment';
        mailOptions.html = realtimeTrends;
        mail.sendingMail(mailOptions);
    })
    .catch((err) => {
        console.log(err);
    });