package com.example.myebook.ui.add_book.components;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.example.myebook.R;

public class ComponentsEditor extends AppCompatActivity {

    int RESULT_CODE;

    private String inputText;

    private EditText etInput;
    private Button btnSave;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_components_editor);

        initilizeFields();


        btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                saveInputs();
            }
        });


    }

    private void initilizeFields(){
        Intent intent = getIntent();
        String title = intent.getStringExtra("title");
        RESULT_CODE = intent.getIntExtra("result_code",0);


        ActionBar actionBar = getSupportActionBar();
        actionBar.setTitle(title);
        actionBar.setDisplayUseLogoEnabled(true);
        actionBar.setDisplayShowHomeEnabled(true);

        etInput = (EditText) findViewById(R.id.input_text);
        btnSave = (Button) findViewById(R.id.save_button);

        etInput.setText(intent.getStringExtra("text"));
    }

    @Override
    public void onBackPressed() {
        saveInputs();

    }

    private void saveInputs(){
        inputText = etInput.getText().toString();
        Intent sendintent = new Intent();
        sendintent.putExtra("inputText",inputText);
        setResult(RESULT_CODE,sendintent);
        finish();
    }
}