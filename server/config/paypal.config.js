const paypal = require("paypal-rest-sdk");

paypal.configure({
    mode: "sandbox",
    client_id: "AUSp21wTdzaQnRU0d5qmvYKbtNQiWV3c2E6_Ht39NQDN1mY3VgJ4WD_ZexD-48a39lKwjBHhQGvaQ-gz",
    client_secret: "EPtPGQXhdcUdUT1Z5sQtr2pQ1HsWggisaU9POVBIqF3LLb8poQxEveQcYcv3_kOieupHVy5jtO8GFezO"
});

module.exports = paypal;