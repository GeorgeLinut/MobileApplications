package com.ubb.glinut.myapplication;

import android.app.AlertDialog;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.design.widget.BottomNavigationView;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.ubb.glinut.myapplication.R;
import com.ubb.glinut.myapplication.adapter.CoinMarketAdapter;
import com.ubb.glinut.myapplication.api.CoinMarketApi;
import com.ubb.glinut.myapplication.model.Asset;
import com.ubb.glinut.myapplication.model.CoinMarket;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by glinut on 12/7/2017.
 */

public class ListActivity extends AppCompatActivity {
    private ListView listView;

    ArrayList<String> assets = new ArrayList<>();
    ArrayList<CoinMarket> coinMarkets = new ArrayList<>();
    CoinMarketAdapter adapter = new CoinMarketAdapter(this,coinMarkets);
    private static final String TAG = "ListActivity";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        Bundle extras = getIntent().getExtras();
        assets= extras.getStringArrayList("numbers");
        httpPart();
        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreate: started");
        setContentView(R.layout.list_activity);
        bottomPart();
        listView = findViewById(R.id.cryptoList);
        listView.setAdapter(adapter);
        listView.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {
            @Override
            public boolean onItemLongClick(AdapterView<?> parent, View view, int position, long id) {
                CoinMarket coinMarket = adapter.getCoinMarkets().get(position);
                showUpdateDialog(coinMarket);
                return false;
            }
        });

    }

    private void bottomPart(){
        BottomNavigationView buBottomNavigationView = (BottomNavigationView) findViewById(R.id.navigationBar);
        Menu menu = buBottomNavigationView.getMenu();
        MenuItem menuItem = menu.getItem(2);
        menuItem.setChecked(true);
        buBottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()){
                    case R.id.ic_home:
                        Intent intent1 = new Intent(ListActivity.this,MainActivity.class);
                        startActivity(intent1);
                        break;
                    case R.id.ic_money:
                        Intent intent = new Intent(ListActivity.this,InvestmentActivity.class);
                        intent.putExtra("numbers", assets);
                        startActivity(intent);
                        break;
                    case R.id.ic_list:
                        break;
                }
                return false;
            }
        });
    }

    private void httpPart(){
        //Http part init
        GsonBuilder builder = new GsonBuilder();

// Register an adapter to manage the date types as long values
        builder.registerTypeAdapter(Date.class, new JsonDeserializer<Date>() {
            public Date deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
                return new Date(json.getAsJsonPrimitive().getAsLong());
            }
        });

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl(CoinMarketApi.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create(builder.create()))
                .build();
        CoinMarketApi api = retrofit.create(CoinMarketApi.class);
        try {
            Call<List<CoinMarket>> call = api.getCoins();
            call.enqueue(new Callback<List<CoinMarket>>() {
                @Override
                public void onResponse(Call<List<CoinMarket>> call, Response<List<CoinMarket>> response) {
                    coinMarkets = (ArrayList)response.body();
                    for (CoinMarket coinMarket:coinMarkets){
                        adapter.add(coinMarket);
                    }
                    adapter.notifyDataSetChanged();
                    Log.v("coins",coinMarkets.toString());
                }

                @Override
                public void onFailure(Call<List<CoinMarket>> call, Throwable t) {
                    Toast.makeText(getApplicationContext(),t.getMessage(),Toast.LENGTH_LONG).show();
                }
            });
        }
        catch (Exception e){
            Log.d("aici",e.getMessage());
        }
    }

    private void showUpdateDialog(CoinMarket coinMarket) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        LayoutInflater inflater = getLayoutInflater();
        final View dialView = inflater.inflate(R.layout.details_dialog, null);
        builder.setView(dialView);
        try {

            final TextView textView4 = (TextView) dialView.findViewById(R.id.textView4);
            textView4.setText(coinMarket.getName());
            final TextView textView5 = (TextView) dialView.findViewById(R.id.textView5);
            textView5.setText(coinMarket.getSymbol());
            final TextView textView6 = (TextView) dialView.findViewById(R.id.textView6);
            textView6.setText(coinMarket.getRank()+"");
            final TextView textView7 = (TextView) dialView.findViewById(R.id.textView7);
            textView7.setText(coinMarket.getPriceUsd() + "");
            final TextView textView8 = (TextView) dialView.findViewById(R.id.textView8);
            textView8.setText(coinMarket.getPriceBtc() + "");
            final TextView textView9 = (TextView) dialView.findViewById(R.id.textView9);
            textView9.setText(coinMarket.getDailyVolume() + "");
            final TextView textView10 = (TextView) dialView.findViewById(R.id.textView10);
            textView10.setText(coinMarket.getMarketCapital() + "");
            final TextView textView11 = (TextView) dialView.findViewById(R.id.textView11);
            textView11.setText(coinMarket.getAvailableSupply() + "");
            final TextView textView12 = (TextView) dialView.findViewById(R.id.textView12);
            textView12.setText(coinMarket.getTotalSupply() + "");
            final TextView textView13 = (TextView) dialView.findViewById(R.id.textView13);
            textView13.setText(coinMarket.getPercentChangeHour() + "");
            final TextView textView14 = (TextView) dialView.findViewById(R.id.textView14);
            textView14.setText(coinMarket.getPercentChangeDay() + "");
            final TextView textView15 = (TextView) dialView.findViewById(R.id.textView15);
            textView15.setText(coinMarket.getPercentChangeWeek() + "");
            final TextView textView16 = (TextView) dialView.findViewById(R.id.textView16);
            textView16.setText(coinMarket.getLastUpdate() + "");
        }
        catch (Exception e){
            Log.d(TAG, e.getMessage());
        }
        final AlertDialog alertDialog = builder.create();
        alertDialog.show();


        builder.setTitle("Updating asset");

    }
    
}
