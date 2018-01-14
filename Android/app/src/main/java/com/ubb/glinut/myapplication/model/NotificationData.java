package com.ubb.glinut.myapplication.model;

import com.google.gson.annotations.SerializedName;

import javax.annotation.Generated;

/**
 * Created by glinut on 1/14/2018.
 */

@Generated("net.hexar.json2pojo")
@SuppressWarnings("unused")
public class NotificationData {

    @SerializedName("detail")
    private String mDetail;

    @SerializedName("title")
    private String mTitle;

    public String getDetail() {
        return mDetail;
    }

    public void setDetail(String detail) {
        mDetail = detail;
    }

    public String getTitle() {
        return mTitle;
    }

    public void setTitle(String title) {
        mTitle = title;
    }
}