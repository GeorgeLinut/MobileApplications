package com.ubb.glinut.myapplication.adapter;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.ubb.glinut.myapplication.R;
import com.ubb.glinut.myapplication.model.CoinMarket;

import java.util.ArrayList;

/**
 * Created by glinut on 11/7/2017.
 */

public class CoinMarketAdapter extends BaseAdapter{
    private Context context;
    ArrayList<CoinMarket> coinmarkets;

    public CoinMarketAdapter(Context context, ArrayList<CoinMarket> coinmarkets) {
        this.context = context;
        this.coinmarkets = coinmarkets;
    }

    public ArrayList<CoinMarket> getCoinMarkets() {
        return coinmarkets;
    }

    @Override
    public int getCount() {
        return coinmarkets.size();
    }

    @Override
    public CoinMarket getItem(int i) {
        return coinmarkets.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    public void add(CoinMarket asset){
        coinmarkets.add(asset);
        notifyDataSetChanged();
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        View v = View.inflate( context, R.layout.currency_item,null);
        TextView currencyView = v.findViewById(R.id.textView);
        TextView amountView = v.findViewById(R.id.textView2);
        currencyView.setText(coinmarkets.get(i).getName());
        amountView.setText(coinmarkets.get(i).getPriceUsd()+"");
        v.setTag(coinmarkets.get(i));
        return v;
    }

    public void clearAll() {
        this.coinmarkets = new ArrayList<>();
    }
}
