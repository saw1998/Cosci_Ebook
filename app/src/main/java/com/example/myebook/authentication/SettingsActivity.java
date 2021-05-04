package com.example.myebook.authentication;

import android.app.ProgressDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import com.example.myebook.MainActivity;
import com.example.myebook.R;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.StorageTask;
import com.google.firebase.storage.UploadTask;
import com.squareup.picasso.Callback;
import com.squareup.picasso.NetworkPolicy;
import com.squareup.picasso.Picasso;
import com.theartofdev.edmodo.cropper.CropImage;
import com.theartofdev.edmodo.cropper.CropImageView;

import java.util.HashMap;

import de.hdodenhof.circleimageview.CircleImageView;

public class SettingsActivity extends AppCompatActivity {

    private CircleImageView profile_image;
    private EditText set_user_name,set_about_me;
    private Button updateButton;

    private FirebaseAuth mAuth;
    private DatabaseReference currentUserReference;
    private String currentUserId;
    private String currentUserEmail;
    //    private DatabaseReference rootReference;
    private ProgressDialog loadingBar;
    private String profileImageDownloadUrl;
    private boolean successfulImageUpload = false;

    private static final int IMAGE_REQUEST=1;
    private StorageTask storageTask;
    private Uri imageUri;
    private StorageReference profileImagesRef;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);

        ActionBar actionBar = getSupportActionBar();
        actionBar.setTitle("Settings");
        actionBar.setDisplayUseLogoEnabled(true);
        actionBar.setDisplayShowHomeEnabled(true);

        initilizeFields();

        updateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                updateSettings();
            }
        });


        Intent intent = getIntent();
        boolean new_user=intent.getBooleanExtra("new_user",false);
        if(!new_user)   //TODO uncomment
        retrieveUserInformation();

        profile_image.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent galleryIntent = new Intent();
                galleryIntent.setAction(Intent.ACTION_GET_CONTENT);
                galleryIntent.setType("image/*");
                startActivityForResult(galleryIntent,IMAGE_REQUEST);
            }
        });

    }

    private void initilizeFields(){
        profile_image=(CircleImageView)findViewById(R.id.set_profile_image);
        set_user_name=(EditText) findViewById(R.id.set_user_name);
        set_about_me=(EditText) findViewById(R.id.set_about_me);
        updateButton=(Button) findViewById(R.id.update_settings_button);
        mAuth=FirebaseAuth.getInstance();

        currentUserId=mAuth.getCurrentUser().getUid();
        currentUserEmail=mAuth.getCurrentUser().getEmail();
        currentUserReference= FirebaseDatabase.getInstance().getReference("Users").child(currentUserId);
        currentUserReference.keepSynced(true);
        loadingBar=new ProgressDialog(this);
        profileImagesRef = FirebaseStorage.getInstance().getReference("profile_images");
        profileImageDownloadUrl="";

    }

    private void updateSettings(){
        String username=set_user_name.getText().toString();
        String aboutme = set_about_me.getText().toString();

        if(TextUtils.isEmpty(username)){
            Toast.makeText(SettingsActivity.this,"Username can't be empty!",Toast.LENGTH_SHORT).show();
        }
        else if(TextUtils.isEmpty(aboutme)){
            Toast.makeText(SettingsActivity.this,"About me can't be empty!",Toast.LENGTH_SHORT).show();
        }
        else{
            loadingBar.setTitle("Updating Preferences!");
            loadingBar.setMessage("Please wait...");
            loadingBar.setCanceledOnTouchOutside(true);
            loadingBar.show();

            HashMap<String,Object> profileMap = new HashMap<>();
            profileMap.put("userName",username);
            profileMap.put("aboutMe",aboutme);
            profileMap.put("imageUrl",profileImageDownloadUrl);           //TODO check it!!, after this firebase data looses some information

            currentUserReference.updateChildren(profileMap, new DatabaseReference.CompletionListener() {
                @Override
                public void onComplete(@Nullable DatabaseError databaseError, @NonNull DatabaseReference databaseReference) {
                    if(databaseError==null){
                        gotoMainActivity();
                    }
                    else{
                        Toast.makeText(SettingsActivity.this,"Error occured while updating the preferences",Toast.LENGTH_SHORT).show();
                    }

                }
            });
            loadingBar.dismiss();

        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if(requestCode==IMAGE_REQUEST &&  resultCode == RESULT_OK && data!=null){

            Uri imageUri = data.getData();

            CropImage.activity()
                    .setGuidelines(CropImageView.Guidelines.ON)
                    .setAspectRatio(1,1)
                    .start(this);
        }

        if (requestCode == CropImage.CROP_IMAGE_ACTIVITY_REQUEST_CODE) {
            CropImage.ActivityResult result = CropImage.getActivityResult(data);
            if (resultCode == RESULT_OK) {
                Uri resultUri = result.getUri();

                final StorageReference filePath = profileImagesRef.child(currentUserId + ".jpg");
                loadingBar.setTitle("Uploading Image!");
                loadingBar.setMessage("Please wait...");
                loadingBar.setCanceledOnTouchOutside(true);
                loadingBar.show();

                filePath.putFile(resultUri).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                    @Override
                    public void onSuccess(UploadTask.TaskSnapshot taskSnapshot){

                        filePath.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
                            @Override
                            public void onSuccess(Uri uri) {
                                profileImageDownloadUrl = uri.toString();
                                successfulImageUpload = true;
                                Toast.makeText(SettingsActivity.this, "Profile Image Uploaded successfully", Toast.LENGTH_SHORT).show();
//                                Toast.makeText(SettingsActivity.this,"Picasso run",Toast.LENGTH_SHORT).show();
                                Picasso.get()
                                        .load(profileImageDownloadUrl)
                                        .resize(250, 250)
                                        .centerCrop()
                                        .into(profile_image);
                            }
                        });
                        loadingBar.dismiss();
                    }
                });

//                currentUserReference.child("imageUrl").setValue(profileImageDownloadUrl)
//                    .addOnCompleteListener(new OnCompleteListener<Void>() {
//                        @Override
//                        public void onComplete(@NonNull Task<Void> task) {
//                            if(task.isSuccessful()){
//                                //TODO loadingBar
//                                Toast.makeText(SettingsActivity.this,"Image Saved in realtime Database Successfully",Toast.LENGTH_SHORT).show();
//                            }
//                            else{
//                                Toast.makeText(SettingsActivity.this,task.getException().getMessage(),Toast.LENGTH_SHORT).show();
//                            }
//                        }
//                    });

            }
        }


    }



    private void retrieveUserInformation(){
        currentUserReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                final UserData userData=  dataSnapshot.getValue(UserData.class);

                set_user_name.setText(userData.getUserName());
                set_about_me.setText(userData.getAboutMe());
                if(userData.getImageUrl().equals(""))
                    profile_image.setImageResource(R.drawable.profile_image);
                else{

                    Picasso.get()
                            .load(userData.getImageUrl())
                            .networkPolicy(NetworkPolicy.OFFLINE)
                            .resize(250, 250)
                            .centerCrop()
                            .into(profile_image, new Callback() {
                                @Override
                                public void onSuccess() {

                                }

                                @Override
                                public void onError(Exception e) {
                                    Picasso.get()
                                            .load(userData.getImageUrl())
                                            .resize(250, 250)
                                            .centerCrop()
                                            .into(profile_image);
                                }
                            });
                }


            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
                Toast.makeText(SettingsActivity.this,"Error :"+databaseError.getMessage(),Toast.LENGTH_SHORT).show();
            }
        });
    }


    private void gotoMainActivity(){
        Intent mainIntent = new Intent(SettingsActivity.this,MainActivity.class);
        mainIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(mainIntent);
        finish();
    }



}
