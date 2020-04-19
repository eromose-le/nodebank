const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const accountData = fs.readFileSync('src/json/accounts.json', 'utf8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(`src/json/users.json`, 'utf8');
const users = JSON.parse(userData);

app.get('/', (req, res) => {
    res.render(
        'index',
        {
            title: 'Account Summary',
            accounts: accounts
        }
    );
});

app.get('/savings', (req, res) => {
    res.render(
        'account', 
        {
            account: accounts.savings
        }
    );
});

app.get('/checking', (req, res) => {
    res.render(
        'account', 
        {
            account: accounts.checking
        }
    );
});

app.get('/credit', (req, res) => {
    res.render(
        'account', 
        {
            account: accounts.credit
        }
    );
});

app.get('/profile', (req, res) => {
    res.render(
        'profile', 
        {
            user: users[0]
        }
    );
});

app.get('/transfer', (req, res) => {
    res.render(
        'transfer'
    )
});

app.post('/transfer', (req, res) => {
    var { from, to, amount } = req.body;
    const toBalance = accounts[to].balance;
    const fromBalance = accounts[from].balance;

    to = parseInt(amount) + parseInt(toBalance);
    from = parseInt(fromBalance) + parseInt(amount);
    console.log(to);
    console.log(from);
    res.send(req.body);
});

app.listen(3000, () => {
    console.log(`PS Project Running on port 3000!`);
});

