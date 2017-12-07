package com.ubb.glinut.myapplication.adapter;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.ubb.glinut.myapplication.R;
import com.ubb.glinut.myapplication.model.Asset;

import java.util.ArrayList;

/**
 * Created by glinut on 11/7/2017.
 */

public class AssetAdapter extends BaseAdapter{
    private Context context;
    ArrayList<Asset> assets;

    public AssetAdapter(Context context, ArrayList<Asset> assets) {
        this.context = context;
        this.assets = assets;
    }

    public ArrayList<Asset> getAssets() {
        return assets;
    }

    @Override
    public int getCount() {
        return assets.size();
    }

    @Override
    public Asset getItem(int i) {
        return assets.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    public void add(Asset asset){
        assets.add(asset);
        notifyDataSetChanged();
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        View v = View.inflate( context, R.layout.currency_item,null);
        TextView currencyView = v.findViewById(R.id.textView);
        TextView amountView = v.findViewById(R.id.textView2);
        currencyView.setText(assets.get(i).getName());
        amountView.setText(Integer.toString(assets.get(i).getPrice()));
        v.setTag(assets.get(i));
        return v;
    }

    public void clearAll() {
        this.assets = new ArrayList<>();
    }
}
