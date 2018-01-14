package com.ubb.glinut.myapplication.model;

import java.io.Serializable;

/**
 * Created by glinut on 12/8/2017.
 */

public class Investment implements Serializable {
    private String name;
    private String price;
    private String change;
    public Investment() {
    }

    public Investment(String name, String price, String change) {
        this.name = name;
        this.price = price;
        this.change = change;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getChange() {
        return change;
    }

    public void setChange(String change) {
        this.change = change;
    }

    @Override
    public String toString() {
        return "Investment{" +
                "name='" + name + '\'' +
                ", price=" + price +
                ", change=" + change +
                '}';
    }

}
