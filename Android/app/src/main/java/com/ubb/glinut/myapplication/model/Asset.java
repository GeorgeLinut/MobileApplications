package com.ubb.glinut.myapplication.model;

/**
 * Created by glinut on 11/7/2017.
 */

public class Asset {
    private String name;
    private int price;
    private String id;

    public Asset() {
    }

    public Asset(String name, int price, String id) {
        this.name = name;
        this.price = price;
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Asset{" +
                "name='" + name + '\'' +
                ", price=" + price +
                ", id=" + id +
                '}';
    }


}
