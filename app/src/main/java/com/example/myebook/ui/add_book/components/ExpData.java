package com.example.myebook.ui.add_book.components;

import java.io.Serializable;

public class ExpData implements Serializable {
    private String ri;
    private String expResult;

    public ExpData(String ri, String expResult) {
        this.ri = ri;
        this.expResult = expResult;
    }

    public ExpData() {
    }

    public String getRi() {
        return ri;
    }

    public void setRi(String ri) {
        this.ri = ri;
    }

    public String getExpResult() {
        return expResult;
    }

    public void setExpResult(String expResult) {
        this.expResult = expResult;
    }
}
