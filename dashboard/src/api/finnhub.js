const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;

export const fetchQuote = async (symbol) => {
  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
    );
    const data = await res.json();

    if (!data || !data.c) return null;

    return {
      symbol,
      price: data.c,
      change: data.c - data.pc,
      changePercent: ((data.c - data.pc) / data.pc) * 100,
    };
  } catch (err) {
    console.error("Error fetching quote for", symbol, err);
    return null;
  }
};
