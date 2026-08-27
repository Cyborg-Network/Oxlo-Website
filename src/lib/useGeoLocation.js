import { useState, useEffect } from "react";

const INDIA_PRICING = {
  pro: { price: 999, requests: 200, label: "₹999", requestsLabel: "200" },
  premium: { price: 2999, requests: 700, label: "₹2,999", requestsLabel: "700" },
  currency: "INR",
  symbol: "₹",
};

const USD_PRICING = {
  pro: { price: 80, requests: 1000, label: "$80", requestsLabel: "1,000" },
  premium: { price: 350, requests: 5000, label: "$350", requestsLabel: "5,000" },
  currency: "USD",
  symbol: "$",
};

let cachedCountry = null;
let fetchPromise = null;

function fetchCountry() {
  if (cachedCountry) return Promise.resolve(cachedCountry);
  if (!fetchPromise) {
    fetchPromise = fetch("https://api.country.is/")
      .then((r) => r.json())
      .then((data) => {
        cachedCountry = data.country || "US";
        return cachedCountry;
      })
      .catch(() => {
        cachedCountry = "US";
        return cachedCountry;
      });
  }
  return fetchPromise;
}

export function useGeoLocation() {
  const [isIndia, setIsIndia] = useState(false);
  const [geoResolved, setGeoResolved] = useState(false);

  useEffect(() => {
    fetchCountry().then((country) => {
      setIsIndia(country === "IN");
      setGeoResolved(true);
    });
  }, []);

  const pricing = isIndia ? INDIA_PRICING : USD_PRICING;

  return { isIndia, geoResolved, pricing };
}
