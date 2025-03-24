document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const cryptoFilter = document.getElementById('crypto-filter');
    const cryptoTableBody = document.getElementById('crypto-table-body');
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessage = document.getElementById('error-message');
    const cryptoTableContainer = document.getElementById('crypto-table-container');
    const themeToggle = document.getElementById('dark-mode-toggle');
    const tableHeaders = document.querySelectorAll('th');

    let cryptoData = [];
    let currentSortKey = 'rank';
    let isSortAscending = true;

    // Dark Mode Persistence
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'dark';
    }

    // Dark Mode Toggle
    themeToggle.addEventListener('change', () => {
        const theme = themeToggle.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Fetch Crypto Data
    async function fetchCryptoData() {
        try {
            loadingIndicator.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            cryptoTableContainer.classList.add('hidden');

            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
            
            if (!response.ok) {
                throw new Error('Failed to fetch crypto data');
            }

            cryptoData = await response.json();
            renderCryptoTable(cryptoData);
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            errorMessage.classList.remove('hidden');
        } finally {
            loadingIndicator.classList.add('hidden');
            cryptoTableContainer.classList.remove('hidden');
        }
    }

    // Render Crypto Table
    function renderCryptoTable(data) {
        cryptoTableBody.innerHTML = '';
        data.forEach(crypto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${crypto.market_cap_rank}</td>
                <td>
                    <img src="${crypto.image}" alt="${crypto.name}" width="20" height="20">
                    ${crypto.name} (${crypto.symbol.toUpperCase()})
                </td>
                <td>$${crypto.current_price.toLocaleString()}</td>
                <td class="${crypto.price_change_percentage_24h > 0 ? 'positive-change' : 'negative-change'}">
                    ${crypto.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>$${(crypto.market_cap / 1000000000).toFixed(2)}B</td>
            `;
            cryptoTableBody.appendChild(row);
        });
    }

    // Search Functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredData = cryptoData.filter(crypto => 
            crypto.name.toLowerCase().includes(searchTerm) || 
            crypto.symbol.toLowerCase().includes(searchTerm)
        );
        renderCryptoTable(filteredData);
    });

    // Filter Functionality
    cryptoFilter.addEventListener('change', () => {
        let filteredData = [...cryptoData];
        switch(cryptoFilter.value) {
            case 'top10':
                filteredData = filteredData.slice(0, 10);
                break;
            case 'stablecoins':
                filteredData = filteredData.filter(crypto => 
                    ['usdt', 'usdc', 'busd', 'dai', 'tusd'].includes(crypto.symbol.toLowerCase())
                );
                break;
        }
        renderCryptoTable(filteredData);
    });

    // Sorting Functionality
    tableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const sortKey = header.dataset.sort;
            if (currentSortKey === sortKey) {
                isSortAscending = !isSortAscending;
            } else {
                currentSortKey = sortKey;
                isSortAscending = true;
            }

            const sortedData = [...cryptoData].sort((a, b) => {
                let valueA, valueB;
                switch(sortKey) {
                    case 'rank':
                        valueA = a.market_cap_rank;
                        valueB = b.market_cap_rank;
                        break;
                    case 'name':
                        valueA = a.name;
                        valueB = b.name;
                        break;
                    case 'price':
                        valueA = a.current_price;
                        valueB = b.current_price;
                        break;
                    case 'change24h':
                        valueA = a.price_change_percentage_24h;
                        valueB = b.price_change_percentage_24h;
                        break;
                    case 'marketcap':
                        valueA = a.market_cap;
                        valueB = b.market_cap;
                        break;
                }
                return isSortAscending 
                    ? (valueA > valueB ? 1 : -1) 
                    : (valueA < valueB ? 1 : -1);
            });

            renderCryptoTable(sortedData);
        });
    });

    // Auto-refresh every 30 seconds
    fetchCryptoData();
    setInterval(fetchCryptoData, 30000);
});