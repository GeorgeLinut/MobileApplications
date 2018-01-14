package com.ubb.glinut.myapplication.notification;

import android.util.Log;

import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;

/**
 * Created by glinut on 1/14/2018.
 */

public class MyFirebaseInstanceIDService extends FirebaseInstanceIdService {

    public MyFirebaseInstanceIDService() {
        onTokenRefresh();
    }

    private String token = "";

    private final String TAG = "MyFirebaseIDService";

    @Override
    public void onTokenRefresh(){
        //Get the updated token
        token = FirebaseInstanceId.getInstance().getToken();
        Log.d(TAG,"New Token: "+token);
    }

    public String getToken() {
        return token;
    }
}
