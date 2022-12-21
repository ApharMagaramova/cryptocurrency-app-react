import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const url = "https://bing-news-search1.p.rapidapi.com";

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      headers.set("X-BingApis-SDK", "true");
      headers.set("X-RapidAPI-Host", "bing-news-search1.p.rapidapi.com");
      headers.set(
        "X-RapidAPI-Key",
        "7719e5f8c7msh947415bbbdddfe9p18ebe1jsn0059544ec8a6"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`,
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
