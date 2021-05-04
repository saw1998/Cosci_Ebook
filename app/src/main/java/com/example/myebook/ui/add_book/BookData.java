package com.example.myebook.ui.add_book;

import android.util.Pair;

import com.example.myebook.ui.add_book.components.ExpData;

import java.util.ArrayList;

public class BookData {
    private String iWonder="";
    private String iPlanTo="";
    private String iFound="";
    private String iThink="";
    private String aUserName="";
    private String aAboutMe="";
    private String aDate="";
    private String simulationsRefKey="";
    private String bookCover="";


    public BookData(String iWonder, String iPlanTo, String iFound, String iThink, String aUserName, String aAboutMe, String aDate,String simulationsRefKey,String bookCover) {
        this.iWonder = iWonder;
        this.iPlanTo = iPlanTo;
        this.iFound = iFound;
        this.iThink = iThink;
        this.aUserName = aUserName;
        this.aAboutMe = aAboutMe;
        this.aDate = aDate;
        this.simulationsRefKey = simulationsRefKey;
        this.bookCover = bookCover;
    }

    public BookData() {
    }

    public String getiWonder() {
        return iWonder;
    }

    public void setiWonder(String iWonder) {
        this.iWonder = iWonder;
    }

    public String getiPlanTo() {
        return iPlanTo;
    }

    public void setiPlanTo(String iPlanTo) {
        this.iPlanTo = iPlanTo;
    }

    public String getiFound() {
        return iFound;
    }

    public void setiFound(String iFound) {
        this.iFound = iFound;
    }

    public String getiThink() {
        return iThink;
    }

    public void setiThink(String iThink) {
        this.iThink = iThink;
    }

    public String getaUserName() {
        return aUserName;
    }

    public void setaUserName(String aUserName) {
        this.aUserName = aUserName;
    }

    public String getaAboutMe() {
        return aAboutMe;
    }

    public void setaAboutMe(String aAboutMe) {
        this.aAboutMe = aAboutMe;
    }

    public String getaDate() {
        return aDate;
    }

    public void setaDate(String aDate) {
        this.aDate = aDate;
    }

    public String getSimulationsRefKey() {
        return simulationsRefKey;
    }

    public void setSimulationsRefKey(String simulationsRefKey) {
        this.simulationsRefKey = simulationsRefKey;
    }

    public String getBookCover() {
        return bookCover;
    }

    public void setBookCover(String bookCover) {
        this.bookCover = bookCover;
    }
}
