package com.ubb.glinut.myapplication.animation;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;

import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.components.Description;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;
import com.ubb.glinut.myapplication.InvestmentActivity;
import com.ubb.glinut.myapplication.MainActivity;
import com.ubb.glinut.myapplication.R;
import com.ubb.glinut.myapplication.adapter.SerializableAdapter;
import com.ubb.glinut.myapplication.model.Investment;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by glinut on 12/8/2017.
 */

public class Chart extends Activity {

    private PieChart pieChart;

    private List<Investment> investments;

    private void calculate(){
        ArrayList<PieEntry> pieEntries = new ArrayList<>();
        HashMap<String,Float> values = new HashMap<>();
        for (Investment investment:investments){
            if (values.containsKey(investment.getName())){
                Float old = values.get(investment.getName());
                old += Float.parseFloat(investment.getPrice());
                values.put(investment.getName(),old);
            }
            else {
                values.put(investment.getName(),Float.parseFloat(investment.getPrice()));
            }
        }
        Iterator it = values.entrySet().iterator();
        while (it.hasNext()){
            Map.Entry pair = (Map.Entry) it.next();
            PieEntry entry = new PieEntry((Float)pair.getValue());
            entry.setLabel((String)pair.getKey());
            pieEntries.add(entry);

        }
        ArrayList<Integer> colors = new ArrayList<>();

        colors.add(Color.BLUE);
        colors.add(Color.RED);
        colors.add(Color.YELLOW);
        colors.add(Color.MAGENTA);
        colors.add(Color.CYAN);
        colors.add(Color.BLUE);

        colors.add(Color.WHITE);
        colors.add(Color.LTGRAY);
        colors.add(Color.GRAY);
        colors.add(Color.DKGRAY);



        PieDataSet pieDataSet = new PieDataSet(pieEntries,"Assets");
        pieDataSet.setColors(colors);


        PieData pieData = new PieData(pieDataSet);
        pieChart.setData(pieData);
        pieChart.invalidate();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.charts);
        Intent intent = getIntent();
        investments = ((SerializableAdapter)intent.getSerializableExtra(InvestmentActivity.LIST_INFO)).getInvestments();


        pieChart=findViewById(R.id.PieChart);

        Description description = new Description();
        description.setText("Wallet");
        pieChart.setDescription(description);
        calculate();
    }
}

