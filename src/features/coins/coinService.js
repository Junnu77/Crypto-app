import axios from "axios"

export const fetchTrendingCoins = async () => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/search/trending`);
    return res.data.coins;
}

export const fetchSearchCoins = async (query) => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`);
    return res.data.coins;
}

export const fetchCoin = async (id) => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    return res.data;
}

export const fetchTickerCoins = async () => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr`);
    return res.data;
}