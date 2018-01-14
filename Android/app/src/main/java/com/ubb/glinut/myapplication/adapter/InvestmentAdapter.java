package com.ubb.glinut.myapplication.adapter;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.ubb.glinut.myapplication.R;
import com.ubb.glinut.myapplication.model.Investment;

import java.util.ArrayList;

/**
 * Created by glinut on 12/8/2017.
 */

public class InvestmentAdapter extends BaseAdapter {
    private Context context;
    ArrayList<Investment> assets;

    public InvestmentAdapter(Context context, ArrayList<Investment> assets) {
        this.context = context;
        this.assets = assets;
    }

    public ArrayList<Investment> getInvestments() {
        return assets;
    }

    @Override
    public int getCount() {
        return assets.size();
    }

    @Override
    public Investment getItem(int i) {
        return assets.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    public void add(Investment asset){
        assets.add(asset);
        notifyDataSetChanged();
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        View v = View.inflate( context, R.layout.currency_item_mine,null);
        TextView currencyView = v.findViewById(R.id.textViewName);
        TextView amountView = v.findViewById(R.id.textViewAmount);
        TextView changeView = v.findViewById(R.id.textViewChange);
        currencyView.setText(assets.get(i).getName());
        amountView.setText(assets.get(i).getPrice()+"$");
        changeView.setText(assets.get(i).getChange()+"%");
        v.setTag(assets.get(i));
        return v;
    }

    public void clearAll() {
        this.assets = new ArrayList<>();
    }
}
