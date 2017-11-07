package com.ubb.glinut.myapplication;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;

import com.ubb.glinut.myapplication.adapter.AssetAdapter;
import com.ubb.glinut.myapplication.model.Asset;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private AssetAdapter adapter;
    private ArrayList<Asset> assets;
    private ListView listView;
    private static int globalId = 1;
    private boolean editFlag = false;
    private int selectedId = 0;
    private final String EMPTY_STRING = "";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        listView = findViewById(R.id.listAssets);
        assets = new ArrayList<>();
        assets.add(new Asset("Bitcoin", 7200, 1));
        globalId++;
        final EditText currencyEditText = (EditText) findViewById(R.id.currencyEditText);
        final EditText amountEditText = (EditText) findViewById(R.id.amountEditText);
        adapter = new AssetAdapter(this, assets);
        listView.setAdapter(adapter);
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                currencyEditText.setText(adapter.getItem(i).getName());
                amountEditText.setText(adapter.getItem(i).getPrice() + "");
                selectedId = adapter.getItem(i).getId();
                editFlag = true;
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
                intent.putExtra(Intent.EXTRA_TEXT, "I own: " + currencyEditText.getText() + " " + amountEditText.getText());
                startActivity(Intent.createChooser(intent, "Send email"));

            }

        });

        Button createAssetButton = (Button) findViewById(R.id.createButton);
        createAssetButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String assetName = currencyEditText.getText().toString();
                Integer assetPrice = Integer.parseInt(amountEditText.getText().toString());
                if (editFlag) {
                    for (int i = 0; i < adapter.getCount(); i++) {
                        if (adapter.getItem(i).getId() == selectedId) {
                            adapter.getItem(i).setName(assetName);
                            adapter.getItem(i).setPrice(assetPrice);
                        }
                    }
                    amountEditText.setText(EMPTY_STRING);
                    currencyEditText.setText(EMPTY_STRING);
                    selectedId = 0;
                    adapter.notifyDataSetChanged();
                } else {
                    globalId++;
                    adapter.add(new Asset(assetName, assetPrice, globalId));
                    adapter.notifyDataSetChanged();
                }
            }
        });
    }
}

//        crossng.sfo.customersalesfolder.fsm.api.dto.events.ContractPrintedNotificationDTO
//        crossng.sales.common.integration.fsm.sosns.impl.service.mapper.SalesObjectNotificationMapper.mapContract(SalesObjectStatusNotificationTypeBase<?>)
//        crossng.sfo.customersalesfolder.impl.service.OfferContractService.createContract(OfferContractCreationDTO, Offer)
//        crossng.salescontract.impl.service.SalesContractCreationService.handleAdditionalCreationInformations(SalesContract, ExtendedCreationInformationDTO[])
//        crossng.salescontract.impl.service.SalesContractCreationService.mapAdditionalFieldsToContract(SalesContractCreationDTO, VehicleOverviewDTO, SalesContract, SalesVehicleDTO, ExtendedCreationInformationDTO...)
//        crossng.salescontract.impl.service.SalesContractCreationService.createSalesContract(SalesContractCreationDTO, ExtendedCreationInformationDTO...)


