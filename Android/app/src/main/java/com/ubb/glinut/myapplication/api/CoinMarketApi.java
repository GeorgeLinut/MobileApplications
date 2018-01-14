package com.ubb.glinut.myapplication.api;

import com.ubb.glinut.myapplication.model.CoinMarket;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

/**
 * Created by glinut on 12/6/2017.
 */

public interface CoinMarketApi {

    String BASE_URL = "https://api.coinmarketcap.com/v1/";
    Integer SPINNER = 5;

    @GET("ticker")
    Call<List<CoinMarket>> getCoins();

}
