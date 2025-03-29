# 🚀 Crypto Price Monitor

## Demo Video Link>>> https://youtu.be/h8ekK74F_QY

## Domain name>> https://www.hauwa.tech/

## Project Overview

The Crypto Price Monitor is a web-based application that provides real-time cryptocurrency market data. It fetches price, market cap, and percentage changes from the CoinGecko API and presents the data in a user-friendly table format. The app includes features such as search, filtering, sorting, and a dark mode toggle for better user experience.

## 🎯 Purpose and Value

In the volatile world of cryptocurrency, having real-time, accurate market information is crucial for investors, traders, and crypto enthusiasts. This application addresses the following needs:

- **Instant Market Insights**: Provides real-time cryptocurrency price tracking
- **Easy Comparison**: Allows users to quickly compare different cryptocurrencies
- **Accessibility**: Offers a user-friendly interface for both novice and experienced crypto followers
- **Customization**: Includes features like dark mode and flexible filtering options

## ✨ Features

### Core Functionality
- **Real-time Cryptocurrency Data**: Fetches live prices from CoinGecko API
- **Comprehensive Market Information**:
  - Cryptocurrency rankings
  - Current prices
  - 24-hour price changes
  - Market capitalization

### Interactive Features
- **Dynamic Search**: Find cryptocurrencies by name or symbol
- **Advanced Filtering**:
  - View all cryptocurrencies
  - Display top 10 cryptocurrencies
  - Filter stablecoins
- **Sorting Capabilities**: 
  - Sort by rank
  - Sort by price
  - Sort by 24-hour change
  - Sort by market cap

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Auto-refresh**: Updates cryptocurrency data every 30 seconds
- **Error Handling**: Graceful error messages and loading indicators

## 🛠 Technologies Used

- **Frontend**: 
  - HTML5
  - CSS3
  - Vanilla JavaScript
- **API**: CoinGecko API
- **External Libraries**: 
  - Font Awesome (icons)

## 🚀 Local Setup and Installation

### Prerequisites
- Modern web browser
- Internet connection

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/crypto-price-monitor.git
   ```
2. Navigate to the project directory
3. Open `index.html` in your web browser

## 🔐 API Usage and Security

### API Integration
- **Source**: CoinGecko Public API
- **Endpoint**: Markets endpoint for cryptocurrency data
- **Rate Limiting**: Respects API rate limits
- **Error Handling**: Implements comprehensive error management

### Security Considerations
- No sensitive API keys required (public endpoint)
- Uses HTTPS for data transmission
- Implements basic error handling to prevent unexpected behavior

## 📡 Deployment Instructions

### Web Server Deployment
1. Copy project files to `/var/www/html/` on Web01 and Web02
2. Ensure web servers (Nginx/Apache) are configured
3. Set up load balancer to distribute traffic

### Load Balancer Configuration (Pseudo-configuration)
```nginx
http {
    upstream crypto_servers {
        server web01.example.com;
        server web02.example.com;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://crypto_servers;
        }
    }
}
```

## 🐛 Known Issues and Limitations
- Limited to top 100 cryptocurrencies
- Relies on public API with potential rate limits
- No historical price tracking in current version

## 🚀 Future Enhancements
- Implement user authentication
- Add historical price charts
- Create a currency conversion feature
- Implement more advanced filtering

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📊 Performance Optimization
- Minimized API calls
- Efficient data rendering
- Responsive design with CSS optimizations

## 🙏 Credits and Acknowledgments
- **API Provider**: [CoinGecko](https://www.coingecko.com/)
  - Providing free, comprehensive cryptocurrency data
- **Icons**: [Font Awesome](https://fontawesome.com/)

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

Project Link: [https://github.com/Noorul-Ayn/crypto-price-monitor](https://github.com/Noorul-Ayn/crypto-price-monitor)
