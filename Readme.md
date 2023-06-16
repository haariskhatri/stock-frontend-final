# Stock Exchange Project

This project is a full-fledged stock exchange application inspired by Groww.in. It provides users with a seamless trading experience, featuring live bidding, order matching, portfolio management, and email notifications for trade updates.

## Backend Repository

The backend code for this project can be found in the following repository:
[Backend Repository](https://github.com/haariskhatri/stock-backend)

## Live Link

You can access the live version of the application [here](https://tradetrek.vercel.app/).
Note: Please use the provided dummy credentials (Email: haarishkkhatri@gmail.com, Password: 123) for demonstration purposes. Email notifications can be observed using your own email address.

## Tools Used

The project was developed using the following tools and technologies:

- React
- Express.js
- Bootstrap
- HTML
- CSS

## Features

1. User Registration and Login:
   - Users can sign up for an account and verify their email using an OTP (One-Time Password).
   - Secure user authentication and session management are implemented.

2. Live Bidding and Order Matching:
   - Users can participate in live bidding for stocks.
   - Real-time updates are provided for bids and order matching.
   - Orders are matched based on price, with partial or combined order execution when necessary.
   - Request for buy and sell made by same user will not be accepted.
   - Buy request and Sell requests are combined to fullfill orders if quantity is less.
   - The price of the stock and the market depth is changed in realtime.
   - The graph also changes dynamically.

3. IPO Registration and Subscription:
   - Admins can register IPOs for companies through the admin panel.
   - Users can subscribe to IPOs, and admins can allocate the IPOs.
   - Upon allocation, the company is listed on the market for trading.

4. Portfolio Management:
   - Users have access to a portfolio management system for tracking their investments.
   - Transaction history and performance analysis are provided.

5. Email Notifications:
   - Email notifications are sent to users for important trade updates.
   - Users can receive order confirmation, trade execution, and portfolio change alerts.

6. Live Graph:
   - A live graph is displayed, showing the performance of stocks.



Feel free to explore and enjoy the stock exchange app!
