package com.ubb.glinut.myapplication.model;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Date;

/**
 * Created by glinut on 12/6/2017.
 */

public class CoinMarket implements Serializable {
    private String id;
    private String name;
    private String symbol;
    private Integer rank;
    @SerializedName("price_usd")
    private Float priceUsd;
    @SerializedName("price_btc")
    private Float priceBtc;
    @SerializedName("24h_volume_usd")
    private Float dailyVolume;
    @SerializedName("market_cap_usd")
    private Float marketCapital;
    @SerializedName("available_supply")
    private Float availableSupply;
    @SerializedName("total_supply")
    private Float totalSupply;
    @SerializedName("percent_change_1h")
    private Float percentChangeHour;
    @SerializedName("percent_change_24h")
    private Float percentChangeDay;
    @SerializedName("percent_change_7d")
    private Float percentChangeWeek;
    @SerializedName("last_updated")
    private Date lastUpdate;

    public CoinMarket(String id, String name, String symbol, Integer rank, Float priceUsd, Float priceBtc, Float dailyVolume, Float marketCapital, Float availableSupply, Float totalSupply, Float percentChangeHour, Float percentChangeDay, Float percentChangeWeek, Date lastUpdate) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
        this.rank = rank;
        this.priceUsd = priceUsd;
        this.priceBtc = priceBtc;
        this.dailyVolume = dailyVolume;
        this.marketCapital = marketCapital;
        this.availableSupply = availableSupply;
        this.totalSupply = totalSupply;
        this.percentChangeHour = percentChangeHour;
        this.percentChangeDay = percentChangeDay;
        this.percentChangeWeek = percentChangeWeek;
        this.lastUpdate = lastUpdate;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSymbol() {
        return symbol;
    }

    public Integer getRank() {
        return rank;
    }

    public Float getPriceUsd() {
        return priceUsd;
    }

    public Float getPriceBtc() {
        return priceBtc;
    }

    public Float getDailyVolume() {
        return dailyVolume;
    }

    public Float getMarketCapital() {
        return marketCapital;
    }

    public Float getAvailableSupply() {
        return availableSupply;
    }

    public Float getTotalSupply() {
        return totalSupply;
    }

    public Float getPercentChangeHour() {
        return percentChangeHour;
    }

    public Float getPercentChangeDay() {
        return percentChangeDay;
    }

    public Float getPercentChangeWeek() {
        return percentChangeWeek;
    }

    public Date getLastUpdate() {
        return lastUpdate;
    }

    @Override
    public String toString() {
        return "CoinMarket{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", symbol='" + symbol + '\'' +
                ", rank=" + rank +
                ", priceUsd=" + priceUsd +
                ", priceBtc=" + priceBtc +
                ", dailyVolume=" + dailyVolume +
                ", marketCapital=" + marketCapital +
                ", availableSupply=" + availableSupply +
                ", totalSupply=" + totalSupply +
                ", percentChangeHour=" + percentChangeHour +
                ", percentChangeDay=" + percentChangeDay +
                ", percentChangeWeek=" + percentChangeWeek +
                ", lastUpdate=" + lastUpdate +
                '}';
    }
}
