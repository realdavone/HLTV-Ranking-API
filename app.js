const express = require('express');
const app = express();
const request = require('request');
const cheerio = require('cheerio');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Serving at ${PORT}`));

app.use(express.static('public'));
app.use(express.json());

app.get('/ranking/:year/:month/:day', (req, res) => {

    const date = new Date(`${req.params.day}.${req.params.month}.${req.params.year}`);
    
    request(`https://www.hltv.org/ranking/teams/${req.params.year}/${req.params.month}/${date.getDay()===0?req.params.day-6:req.params.day-date.getDay()+1}`, (error, response, html) => {

        if(!error){
            const $ = cheerio.load(html);

            const header = $('.regional-ranking-header').text();
            const teams = [];

            $('.ranked-team').each((i, elm1) => {
                const $element = $(elm1);
                $name = $element.find('.name'),
                $logo = $element.find('img'),
                $points = $element.find('.points'),
                $teamLink = $element.find('.moreLink'),
                $changeInRank = $element.find('.change'),
                $playersHolder = $element.find('.playersLine');
                
                const players = $playersHolder.text().match(/\S[A-Za-z0-9-_]*/gm);

                const team = {
                    team_name: $name.text(),
                    team_logo: $logo.attr('src'),
                    team_hltv_link: `https://www.hltv.org${$teamLink.attr('href')}`,
                    team_points: $points.text().match(/\d+/)[0],
                    team_change_in_rank: `${$changeInRank.text()==='-'?'0':$changeInRank.text()}`,
                    team_players: players
                }

                teams.push(team);
            });

            res.json({
                header,
                teams
            })
        }
    });
});

