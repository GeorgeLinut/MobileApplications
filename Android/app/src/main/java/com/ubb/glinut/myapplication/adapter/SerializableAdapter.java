package com.ubb.glinut.myapplication.adapter;

import com.ubb.glinut.myapplication.model.Investment;

import java.io.Serializable;
import java.util.List;

/**
 * Created by glinut on 12/8/2017.
 */

public class SerializableAdapter implements Serializable {
    private List<Investment> investments;

    public List<Investment> getInvestments() {
        return investments;
    }

    public void setInvestments(List<Investment> investments) {
        this.investments = investments;
    }

    public SerializableAdapter(List<Investment> investments) {

        this.investments = investments;
    }
}

