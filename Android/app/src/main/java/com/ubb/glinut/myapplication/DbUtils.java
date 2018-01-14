package com.ubb.glinut.myapplication;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;

/**
 * Created by glinut on 1/7/2018.
 */


public class DbUtils {

    public static String role;
    public static FirebaseAuth firebaseAuth;
    public static DatabaseReference databaseReference;
    public static FirebaseUser user;
    public static FirebaseStorage storage;
    public static StorageReference storageReference;

    private static final DbUtils ourInstance = new DbUtils();

    public static DbUtils getInstance() {
        firebaseAuth = FirebaseAuth.getInstance();
        databaseReference = FirebaseDatabase.getInstance().getReference();
        user = firebaseAuth.getCurrentUser();
        return ourInstance;
    }

    private DbUtils() {
        firebaseAuth = FirebaseAuth.getInstance();
        databaseReference = FirebaseDatabase.getInstance().getReference();
        user = firebaseAuth.getCurrentUser();

    }

    public static String getRole() {

        return role;
    }
}
