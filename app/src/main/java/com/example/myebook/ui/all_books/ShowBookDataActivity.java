package com.example.myebook.ui.all_books;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.GridLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.myebook.R;
import com.example.myebook.ui.add_book.components.ComponentTable;
import com.example.myebook.ui.add_book.components.DynamicViews;
import com.example.myebook.ui.simulation.Simulation2;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class ShowBookDataActivity extends AppCompatActivity {
    private ScrollView scrollView;
    private TextView iwonder;
    private TextView iplan;
    private TextView ifound;
    private TextView ithink;
    private GridLayout simAndResult;

    private String iWonder;
    private String iPlan;
    private String iFound;
    private String iThink;
    private String simulationKey;
    private String userName,aboutMe;
    private DynamicViews dnv;

    DatabaseReference simulationRef;
    private int columnNo=3;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_show_book_data);


        initializeFields();

        iwonder.setText(iWonder);
        iplan.setText(iPlan);
        ifound.setText(iFound);
        ithink.setText(iThink);
        setSimulation();

//        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle(userName);
        getSupportActionBar().setSubtitle(aboutMe);

    }

    private void initializeFields(){
        scrollView = findViewById(R.id.scrollView);
        iwonder = (TextView) scrollView.findViewById(R.id.tv_iwonder);
        iplan = (TextView) findViewById(R.id.tv_iplan   );
        ifound = (TextView) findViewById(R.id.tv_ifound);
        ithink = (TextView) findViewById(R.id.tv_ithink);
        simAndResult = (GridLayout) findViewById(R.id.gridLayout_show);

        Intent intent = getIntent();
        iWonder = intent.getStringExtra("iwonder");
        iPlan = intent.getStringExtra("iplan");
        iFound = intent.getStringExtra("ifound");
        iThink = intent.getStringExtra("ithink");
        userName = intent.getStringExtra("username");
        aboutMe  = intent.getStringExtra("aboutme");
        simulationKey = intent.getStringExtra("simulationKey");

        dnv = new DynamicViews();

        simulationRef = FirebaseDatabase.getInstance().getReference("Simulations").child(simulationKey);
        simulationRef.keepSynced(true);


    }

    private void setSimulation(){
        simulationRef.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                for(DataSnapshot item_snapshot:snapshot.getChildren()){
                    simAndResult.addView(dnv.refractiveIndexShow(getApplicationContext(),item_snapshot.getKey().substring(4).replace('d','.')),columnNo++);
                    simAndResult.addView(dnv.playButtonShow(getApplicationContext()),columnNo++);
                    simAndResult.addView(dnv.showResult(getApplicationContext(),item_snapshot.getValue().toString()),columnNo++);

                    final int btnId = dnv.getPlayButtonShowId()-1;
                    final Button btn = (Button) findViewById(btnId);

//
                    btn.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {

                            TextView et = (TextView)findViewById(btnId-1000);
                            float k = Float.parseFloat(et.getText().toString());
                            Intent intent = new Intent(ShowBookDataActivity.this, Simulation2.class);
                            intent.putExtra("ri",k);
                            startActivity(intent);

                        }
                    });
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(ShowBookDataActivity.this,"Error occoured! please restart the ebook",Toast.LENGTH_LONG).show();
            }
        });
    }

}