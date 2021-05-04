package com.example.myebook.ui.add_book.components;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.GridLayout;

import com.example.myebook.R;
import com.example.myebook.ui.simulation.Simulation2;

import java.util.ArrayList;

public class ComponentTable extends AppCompatActivity {
    private Button addButton;
    private DynamicViews dnv;
    private GridLayout gridLayout;
    private Button saveButton;
    private ArrayList<ExpData> simulations;
    int RESULT_CODE;
    private int gridNo = 3;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_component_table);

        initializeFields();

        ActionBar actionBar = getSupportActionBar();
        actionBar.setTitle("Experiment and results");
        actionBar.setDisplayUseLogoEnabled(true);
        actionBar.setDisplayShowHomeEnabled(true);

        setSimulations();

        addButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                gridLayout.addView(dnv.refractiveIndex(getApplicationContext(),""),gridNo++);
                gridLayout.addView(dnv.playButton(getApplicationContext()),gridNo++);
                gridLayout.addView(dnv.editResult(getApplicationContext(),""),gridNo++);

                final int btnId = dnv.getPlayButtonId()-1;
                final Button btn = (Button) findViewById(btnId);

//
                btn.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                        EditText et = findViewById(btnId-1000);
                        float k = Float.parseFloat(et.getText().toString());
                        Intent intent = new Intent(ComponentTable.this, Simulation2.class);
                        intent.putExtra("ri",k);
                        startActivity(intent);

                    }
                });
            }
        });

        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                saveTable();
                sendIndent();

            }
        });


    }

    private void initializeFields(){
        simulations = new ArrayList<>();
        Intent intent = getIntent();
//        String title = intent.getStringExtra("title");
        RESULT_CODE = intent.getIntExtra("result_code",0);
//        simulations = (ArrayList<Pair<String, String>>) intent.getSerializableExtra("simulation");
        simulations=((ArrayList<ExpData>) intent.getSerializableExtra("simulation"));
        addButton = (Button)findViewById(R.id.add_simulation_button);
        gridLayout = (GridLayout)findViewById(R.id.gridLayout);
        dnv = new DynamicViews();
        saveButton = (Button)findViewById(R.id.save_table_button);

    }

    public void setSimulations(){
        for(int i=0;i<simulations.size();i++){
            gridLayout.addView(dnv.refractiveIndex(getApplicationContext(),simulations.get(i).getRi()),gridNo++);
            gridLayout.addView(dnv.playButton(getApplicationContext()),gridNo++);
            gridLayout.addView(dnv.editResult(getApplicationContext(),simulations.get(i).getExpResult()),gridNo++);

            final int btnId = dnv.getPlayButtonId()-1;
            final Button btn = (Button) findViewById(btnId);

//
            btn.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    EditText et = findViewById(btnId-1000);
                    float k = Float.parseFloat(et.getText().toString());
                    Intent intent = new Intent(ComponentTable.this, Simulation2.class);
                    intent.putExtra("ri",k);
                    startActivity(intent);

                }
            });

        }
    }

    @Override
    public void onBackPressed() {
        saveTable();
        sendIndent();
    }

    private void saveTable(){
        int i=0;
        EditText ri;
        EditText result;
        simulations.clear();
        for(i=0;i<dnv.getRiId();i++){
            ri=(EditText)findViewById(i);
            result=(EditText)findViewById(2000+i);
            simulations.add(new ExpData(ri.getText().toString(),result.getText().toString()));
        }
    }
    private void sendIndent(){
        Intent sendintent = new Intent();
        sendintent.putExtra("simulation",simulations);
        setResult(RESULT_CODE,sendintent);
        finish();
    }
}