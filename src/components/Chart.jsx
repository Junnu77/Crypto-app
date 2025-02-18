import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Chart = ({ coinSymbol }) => {
  const { themeMode: theme } = useSelector((state) => state.theme);
  const containerRef = useRef(null);

  useEffect(() => {
    // Clear the previous script
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: 460,
      symbol: `BINANCE:${coinSymbol}USDT`,
      interval: "D",
      theme: theme ? "dark" : "light",
      style: "1",
      locale: "en",
      toolbar_bg: "#f1f3f6",
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: "tradingview-chart",
    });

    containerRef.current.appendChild(script);
  }, [coinSymbol, theme]);

  return <div ref={containerRef} id="tradingview-chart" />;
};

export default Chart;
