package com.example.myebook.ui.add_book.components;

import android.content.Context;
import android.graphics.Color;
import android.text.InputType;
import android.view.Gravity;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.myebook.R;

import java.util.Random;

public class DynamicViews {

    private int riId=0;
    private int playButtonId=1000;
    private int resultId=2000;
    private int riIdShow=3000;
    private int playButtonShowId=4000;
    private int resultShowId=5000;


    public DynamicViews() {
        Random rand = new Random();
        
    }

    public EditText refractiveIndex(Context context,String rindex){
        final ViewGroup.LayoutParams lparams = new ViewGroup.LayoutParams(300,ViewGroup.LayoutParams.WRAP_CONTENT);
        final EditText editText = new EditText(context);
        editText.setLayoutParams(lparams);
        editText.setId(riId);
        editText.setText(rindex);
        riId++;
        editText.setTextColor(Color.rgb(0,0,0   ));
//        editText.setMaxEms(5)\\\\\\\\\\;
        editText.setInputType(InputType.TYPE_TEXT_FLAG_MULTI_LINE);
        editText.setGravity(Gravity.CENTER_HORIZONTAL);
//        editText.setBackgroundResource(R.drawable.input);
//        editText.setBackgroundColor(Color.rgb(0,0,0));
        return editText;
    }

    public TextView refractiveIndexShow(Context context,String string){
        final ViewGroup.LayoutParams lparams = new ViewGroup.LayoutParams(300,ViewGroup.LayoutParams.WRAP_CONTENT);
        final TextView showText = new TextView(context);
        showText.setLayoutParams(lparams);
        showText.setId(riIdShow);
        riIdShow++;
        showText.setTextColor(Color.rgb(0,0,0   ));
//        editText.setMaxEms(5)\\\\\\\\\\;
        showText.setText(" "+string);
        showText.setInputType(InputType.TYPE_TEXT_FLAG_MULTI_LINE);
        showText.setGravity(Gravity.CENTER_HORIZONTAL);
//        editText.setBackgroundResource(R.drawable.input);
//        editText.setBackgroundColor(Color.rgb(0,0,0));
        return showText;
    }

    public Button playButton(Context context){
        final ViewGroup.LayoutParams lparams = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT);
        final Button button = new Button(context);
        button.setLayoutParams(lparams);
        button.setId(playButtonId);
        playButtonId++;
        button.setText("Play");
        button.setMinEms(2);
//        button.setTextColor(Color.rgb(0,15,0));
        return button;
    }

    public Button playButtonShow(Context context){
        final ViewGroup.LayoutParams lparams = new ViewGroup.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT,ViewGroup.LayoutParams.WRAP_CONTENT);
        final Button button = new Button(context);
        button.setLayoutParams(lparams);
        button.setId(playButtonShowId);
        playButtonShowId++;
        button.setText("Play");
        button.setMinEms(2);
//        button.setTextColor(Color.rgb(0,15,0));
        return button;
    }

    public EditText editResult(Context context,String result){
        final ViewGroup.LayoutParams lparams = new ViewGroup.LayoutParams(500,ViewGroup.LayoutParams.MATCH_PARENT);
        final EditText editText = new EditText(context);
        editText.setLayoutParams(lparams);
        editText.setId(resultId);
        editText.setText(result);
        resultId++;
        editText.setGravity(Gravity.CENTER_HORIZONTAL);
        editText.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_MULTI_LINE);
        editText.setMaxLines(10);
        editText.setTextColor(Color.rgb(0,0,0));
//        editText.setBackgroundResource(R.drawable.input);


        return editText;

    }

    public TextView showResult(Context context,String string){
        final ViewGroup.LayoutParams lparams = new ViewGroup.LayoutParams(500,ViewGroup.LayoutParams.MATCH_PARENT);
        final TextView showText = new TextView(context);
        showText.setLayoutParams(lparams);
        showText.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_FLAG_MULTI_LINE);
        showText.setText("  "+string);
        showText.setTextColor(Color.rgb(0,0,0));
//        editText.setBackgroundResource(R.drawable.input);

        showText.setGravity(Gravity.CENTER_HORIZONTAL);
        return showText;

    }

    public int getRiId() {
        return riId;
    }

    public void setRiId(int riId) {
        this.riId = riId;
    }

    public int getPlayButtonId() {
        return playButtonId;
    }

    public void setPlayButtonId(int playButtonId) {
        this.playButtonId = playButtonId;
    }

    public int getResultId() {
        return resultId;
    }

    public void setResultId(int resultId) {
        this.resultId = resultId;
    }

    public int getRiIdShow() {
        return riIdShow;
    }

    public void setRiIdShow(int riIdShow) {
        this.riIdShow = riIdShow;
    }

    public int getPlayButtonShowId() {
        return playButtonShowId;
    }

    public void setPlayButtonShowId(int playButtonShowId) {
        this.playButtonShowId = playButtonShowId;
    }

    public int getResultShowId() {
        return resultShowId;
    }

    public void setResultShowId(int resultShowId) {
        this.resultShowId = resultShowId;
    }
}
