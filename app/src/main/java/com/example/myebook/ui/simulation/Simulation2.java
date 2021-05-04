package com.example.myebook.ui.simulation;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.EditText;
import android.widget.Toast;

import com.example.myebook.R;

public class Simulation2 extends AppCompatActivity {

    WebView webView;
    float k;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_simulation2);

        ActionBar actionBar = getSupportActionBar();
        actionBar.setTitle("Simulation");
        actionBar.setDisplayUseLogoEnabled(true);
        actionBar.setDisplayShowHomeEnabled(true);

        Intent intent = getIntent();
        try{
            k = intent.getFloatExtra("ri",-1);

            if(k==-1){
                Toast.makeText(Simulation2.this,"unexpected error occoured, please try again!",Toast.LENGTH_LONG).show();
                k= (float) 1.33;
            }
        }
        catch(Exception e){
            Toast.makeText(Simulation2.this,"unexpected value of refractive index!",Toast.LENGTH_LONG).show();
            k= (float) 1.33;
        }

        if(k>1.5 || k<1.0){
            Toast.makeText(Simulation2.this,"out of range value of refractive index!",Toast.LENGTH_LONG).show();
            k=(float) 1.33;
        }



        SetVariable myVariable = new SetVariable();
        webView=(WebView) findViewById(R.id.webview2);
        webView.loadUrl("file:///android_asset/index2.html");
        webView.getSettings().setJavaScriptEnabled(true);
        webView.addJavascriptInterface(myVariable,"variable");

    }


    class SetVariable{
        @JavascriptInterface
        public float setDensity(){
            System.out.println(k);
            return k;
        }
    }
}