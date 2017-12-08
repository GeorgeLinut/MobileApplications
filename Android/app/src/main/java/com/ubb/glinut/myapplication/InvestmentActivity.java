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
import com.ubb.glinut.myapplication.adapter.CoinMarketAdapter;
import com.ubb.glinut.myapplication.adapter.InvestmentAdapter;
import com.ubb.glinut.myapplication.adapter.SerializableAdapter;
import com.ubb.glinut.myapplication.animation.Chart;
import com.ubb.glinut.myapplication.api.CoinMarketApi;
import com.ubb.glinut.myapplication.model.Asset;
import com.ubb.glinut.myapplication.model.CoinMarket;
import com.ubb.glinut.myapplication.model.Investment;

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

public class InvestmentActivity extends AppCompatActivity {
    private ListView listView;
    private Button chartsButton;
    public static final String LIST_INFO ="LISTINFO";
    ArrayList<CoinMarket> coinMarkets = new ArrayList<>();
    ArrayList<Asset> assets = new ArrayList<>();
    ArrayList<Investment> investments = new ArrayList<>();
    InvestmentAdapter adapter = new InvestmentAdapter(this,investments);
    private static final String TAG = "InvestmentActivity";
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        Bundle extras = getIntent().getExtras();
        ArrayList<String> answer= extras.getStringArrayList("numbers");
        for (String s:answer){
            String[] tokens = s.split(" ");
            assets.add(new Asset(tokens[0],Integer.parseInt(tokens[1]),tokens[2]));
        }
        httpPart();
        super.onCreate(savedInstanceState);
        Log.d(TAG, "onCreate: started");
        setContentView(R.layout.invest_activity);
        bottomPart();
        listView = findViewById(R.id.list_mine);
        listView.setAdapter(adapter);
        chartsButton = findViewById(R.id.buttonChart);
        chartsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                goToCharts();
            }
        });

    }

    private void bottomPart(){
        BottomNavigationView buBottomNavigationView = (BottomNavigationView) findViewById(R.id.navigationBar);
        Menu menu = buBottomNavigationView.getMenu();
        MenuItem menuItem = menu.getItem(1);
        menuItem.setChecked(true);
        buBottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()){
                    case R.id.ic_home:
                        Intent intent = new Intent(InvestmentActivity.this,MainActivity.class);
                        startActivity(intent);
                        break;
                    case R.id.ic_money:
                        break;
                    case R.id.ic_list:
                        Intent intent1 = new Intent(InvestmentActivity.this,ListActivity.class);
                        startActivity(intent1);
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
                    for (Asset asset:assets){
                        for (CoinMarket coinMarket:coinMarkets){
                            if (coinMarket.getName().equals(asset.getName())){
                                adapter.add(new Investment(coinMarket.getName(),(coinMarket.getPriceUsd()*asset.getPrice())+"",coinMarket.getPercentChangeDay()+""));
                            }
                        }
                    }
                    adapter.notifyDataSetChanged();
                    Log.v("coins",investments.toString());
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

    public void goToCharts(){
        Intent intent = new Intent(InvestmentActivity.this, Chart.class);
        SerializableAdapter serAdapter = new SerializableAdapter(adapter.getInvestments());
        intent.putExtra(LIST_INFO,serAdapter);
        try {
            startActivity(intent);
        }
        catch (Exception e)
        {
            Log.d(TAG, e.getMessage());
        }
    }





}
