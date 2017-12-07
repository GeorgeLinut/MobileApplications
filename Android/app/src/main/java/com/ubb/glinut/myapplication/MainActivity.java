package com.ubb.glinut.myapplication;

import android.app.AlertDialog;
import android.content.Intent;
import android.os.Build;
import android.provider.MediaStore;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.ubb.glinut.myapplication.adapter.AssetAdapter;
import com.ubb.glinut.myapplication.api.CoinMarketApi;
import com.ubb.glinut.myapplication.model.Asset;
import com.ubb.glinut.myapplication.model.CoinMarket;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.SimpleTimeZone;
import java.util.stream.Collectors;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    private AssetAdapter adapter;
    Spinner spinnerCoins;
    private ArrayList<Asset> assets;
    private ListView listView;
    private EditText amountEditText;
    private
    List<CoinMarket> coinMarkets;
    List<String>strings = new ArrayList<>();
    String[] arraySpinner = new String[CoinMarketApi.SPINNER];

    DatabaseReference databaseCoins = FirebaseDatabase.getInstance().getReference("coins");


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        adapter = new AssetAdapter(this, new ArrayList<Asset>());
        //setup spinner
        this.arraySpinner = strings.toArray(this.arraySpinner);
        spinnerCoins = (Spinner) findViewById(R.id.spinnerCoin);
        ArrayAdapter<String> adapter1 = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, arraySpinner);
        adapter1.setDropDownViewResource(R.layout.support_simple_spinner_dropdown_item);
        spinnerCoins.setAdapter(adapter1);

        listView = findViewById(R.id.listAssets);
        listView.setAdapter(adapter);
        assets = new ArrayList<>();
        amountEditText = (EditText) findViewById(R.id.amountEditText);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                amountEditText.setText(adapter.getItem(i).getPrice() + "");
            }
        });
        listView.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {
            @Override
            public boolean onItemLongClick(AdapterView<?> parent, View view, int position, long id) {
                Asset asset = adapter.getAssets().get(position);
                showUpdateDialog(asset.getId(), "" + asset.getPrice());
                return false;
            }
        });
        Button sendMailButton = (Button) findViewById(R.id.sendButton);

        sendMailButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(Intent.ACTION_SEND);
                intent.setType("text/html");
                intent.putExtra(Intent.EXTRA_EMAIL, "george.linut.1000@gmail.com");
                intent.putExtra(Intent.EXTRA_SUBJECT, "Subject");
                intent.putExtra(Intent.EXTRA_TEXT, "I own: " + " " + amountEditText.getText());
                startActivity(Intent.createChooser(intent, "Send email"));

            }

        });

        Button createAssetButton = (Button) findViewById(R.id.createButton);
        createAssetButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                addCoin();

            }
        });
    }

    private void addCoin() {
        Integer assetPrice = Integer.parseInt(amountEditText.getText().toString());
        String coin = spinnerCoins.getSelectedItem().toString();
        if (TextUtils.isEmpty(amountEditText.getText().toString())) {
            Toast.makeText(this, "Please an amount for the coin you selected", Toast.LENGTH_LONG).show();
        } else {
            String id = databaseCoins.push().getKey();
            Asset asset = new Asset(coin, assetPrice, id);
            databaseCoins.child(id).setValue(asset);
            adapter.add(asset);
            adapter.notifyDataSetChanged();
            Toast.makeText(this, "Asset Added", Toast.LENGTH_LONG).show();
        }
    }

    @Override
    protected void onStart() {
        super.onStart();
        databaseCoins.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                databaseCoins.addListenerForSingleValueEvent(
                        new ValueEventListener() {
                            @Override
                            public void onDataChange(DataSnapshot dataSnapshot) {
                                //Get map of users in datasnapshot
                                updateAdapter((Map<String, Object>) dataSnapshot.getValue());
                            }

                            @Override
                            public void onCancelled(DatabaseError databaseError) {
                                //handle databaseError
                            }
                        });
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
        httpPart();
    }

    private void updateAdapter(Map<String, Object> users) {

        adapter.clearAll();

        //iterate through each user, ignoring their UID
        for (Map.Entry<String, Object> entry : users.entrySet()) {

            //Get user map
            Map singleCoin = (Map) entry.getValue();
            //Get phone field and append to list
            adapter.add(new Asset(singleCoin.get("name").toString(), Integer.parseInt(singleCoin.get("price").toString()), singleCoin.get("id").toString()));
        }
        adapter.notifyDataSetChanged();
    }

    private void showUpdateDialog(final String coinId, String amount) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        LayoutInflater inflater = getLayoutInflater();
        final View dialView = inflater.inflate(R.layout.update_dialog, null);
        builder.setView(dialView);
        final EditText editText = (EditText) dialView.findViewById(R.id.editTextAmount);
        final Button button = (Button) dialView.findViewById(R.id.buttonUpdate);
        this.arraySpinner = strings.toArray(this.arraySpinner);
        final Spinner spinnerUpdate = (Spinner) dialView.findViewById(R.id.spinnerUpdate);
        ArrayAdapter<String> adapter1 = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, arraySpinner);
        spinnerUpdate.setAdapter(adapter1);
        final Button deleteButton = (Button) dialView.findViewById(R.id.buttonDelete);

        builder.setTitle("Updating asset");
        final AlertDialog alertDialog = builder.create();
        alertDialog.show();
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String amount = editText.getText().toString().trim();
                String name = spinnerUpdate.getSelectedItem().toString();
                if (TextUtils.isEmpty(amount)) {
                    editText.setError("Amount required!");
                    return;
                }
                updateAsset(coinId, amount, name);
                alertDialog.dismiss();
            }
        });
        deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String amount = editText.getText().toString().trim();
                deleteAsset(coinId);
                alertDialog.dismiss();
            }
        });


    }

    private void deleteAsset(String coinId) {
        DatabaseReference reference = FirebaseDatabase.getInstance().getReference("coins").child(coinId);
        reference.removeValue();
        Toast.makeText(this, "Asset Deleted!", Toast.LENGTH_LONG).show();

    }

    private boolean updateAsset(String id, String amount, String name) {
        DatabaseReference reference = FirebaseDatabase.getInstance().getReference("coins").child(id);
        Asset asset = new Asset(name, Integer.parseInt(amount), id);
        reference.setValue(asset);
        Toast.makeText(this, "Asset Update Successfully", Toast.LENGTH_LONG).show();
        return true;
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
                @RequiresApi(api = Build.VERSION_CODES.N)
                @Override
                public void onResponse(Call<List<CoinMarket>> call, Response<List<CoinMarket>> response) {
                    coinMarkets = response.body();
                    //does not work because my broke ass phone has android < 7
//                    strings = coinMarkets.stream()
//                            .map(t->t.getName())
//                            .limit(CoinMarketApi.SPINNER)
//                            .collect(Collectors.toList());
                    for (int i=0;i<CoinMarketApi.SPINNER;i++){
                        strings.add(coinMarkets.get(i).getName());
                    }
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
}


