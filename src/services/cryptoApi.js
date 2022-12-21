import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = "https://coinranking1.p.rapidapi.com";

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Host", "coinranking1.p.rapidapi.com");
      headers.set(
        "X-RapidAPI-Key",
        "7719e5f8c7msh947415bbbdddfe9p18ebe1jsn0059544ec8a6"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => `/coins?limit=${count}`,
    }),

    getCryptoDetails: builder.query({
      query: (coinId) => `/coin/${coinId}`,
    }),

    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        `/coin/${coinId}/history?timePeriod=${timePeriod}`,
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
