package com.ubb.glinut.myapplication.notification;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.Ringtone;
import android.media.RingtoneManager;
import android.net.Uri;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.ubb.glinut.myapplication.LoginActivity;
import com.ubb.glinut.myapplication.MainActivity;
import com.ubb.glinut.myapplication.R;

/**
 * Created by glinut on 1/14/2018.
 */

public class MyFirebaseMessagingService extends FirebaseMessagingService{
    private static final String TAG = "MyFirebaseMsgService";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.d(TAG,"from: "+remoteMessage.getFrom());
        if (remoteMessage.getData().size()>0){
            Log.d(TAG,"Message data:" + remoteMessage.getData());
            sendNotification((String)remoteMessage.getData().values().iterator().next());
        }
        if (remoteMessage.getNotification()!=null){
            Log.d(TAG,"mESSAGE BODY:"+ remoteMessage.getNotification().getBody());
            sendNotification(remoteMessage.getNotification().getBody());
        }
    }

    private void sendNotification(String body) {
        Intent intent = new Intent(this, LoginActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);

        PendingIntent pendingIntent = PendingIntent.getActivity(this,0,intent,PendingIntent.FLAG_ONE_SHOT);
        Uri notidicationSound = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        NotificationCompat.Builder notifiBuilder =  new NotificationCompat.Builder(this)
                .setSmallIcon(R.mipmap.bitcoin)
                .setContentTitle("Firebase notification")
                .setContentText(body)
                .setAutoCancel(true)
                .setSound(notidicationSound)
                .setContentIntent(pendingIntent);

        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(0,notifiBuilder.build());
    }
}
