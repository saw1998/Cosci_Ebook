package com.example.myebook.authentication;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import com.example.myebook.MainActivity;
import com.example.myebook.R;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.HashMap;
import java.util.Objects;

public class RegisterActivity extends AppCompatActivity {

    private EditText register_email,register_password,register_confirm_password;
    private Button createAccount;
    private TextView alreadyHaveAnAccount;

    private FirebaseAuth userAuth;
    private ProgressDialog loadingBar;
    private DatabaseReference currentUserReference;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        ActionBar actionBar = getSupportActionBar();
        actionBar.setTitle("Register");
        actionBar.setDisplayUseLogoEnabled(true);
        actionBar.setDisplayShowHomeEnabled(true);

        initializeFields();

        createAccount.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                createUserAccount();
            }
        });

        alreadyHaveAnAccount.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                gotoLoginActivity();
            }
        });
    }


    private void initializeFields() {
        register_email=(EditText)findViewById(R.id.register_email);
        register_password=(EditText)findViewById(R.id.register_password);
        register_confirm_password=(EditText)findViewById(R.id.confirm_register_password);
        createAccount = (Button)findViewById(R.id.register_button);
        alreadyHaveAnAccount=(TextView)findViewById(R.id.already_have_an_account);
        loadingBar=new ProgressDialog(this);
        userAuth = FirebaseAuth.getInstance();
//        rootRefrence= FirebaseDatabase.getInstance().getReference("");
    }

    private void createUserAccount() {
        final String email=register_email.getText().toString();
        final String password=register_password.getText().toString();
        final String con_password=register_confirm_password.getText().toString();

        if(TextUtils.isEmpty(email)){
            Toast.makeText(RegisterActivity.this,"Email can't be empty",Toast.LENGTH_SHORT).show();
        }
        else if(TextUtils.isEmpty(password)){
            Toast.makeText(RegisterActivity.this,"Invalid Password",Toast.LENGTH_SHORT).show();
        }
        else if(!password.equals(con_password)){
            Toast.makeText(RegisterActivity.this,"Password and Confirm password should be same",Toast.LENGTH_SHORT).show();
        }
        else{

            loadingBar.setTitle("Creating new Account");
            loadingBar.setMessage("Please wait...");
            loadingBar.setCanceledOnTouchOutside(true);
            loadingBar.show();

            userAuth.createUserWithEmailAndPassword(email,password)
                    .addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(@NonNull Task<AuthResult> task) {
                            if(task.isSuccessful()){
                                String currentUserId = userAuth.getCurrentUser().getUid();

                                currentUserReference= FirebaseDatabase.getInstance().getReference("Users").child(currentUserId);
                                currentUserReference.keepSynced(true);

                                HashMap<String,String> hashMap= new HashMap<>();
//                                hashMap.put("userId",currentUserId);
                                hashMap.put("userName","");
                                hashMap.put("email",email);
                                hashMap.put("imageUrl","");
                                hashMap.put("aboutMe","");

                                currentUserReference.setValue(hashMap).addOnCompleteListener(new OnCompleteListener<Void>() {
                                    @Override
                                    public void onComplete(@NonNull Task<Void> task) {
                                        if(task.isSuccessful()){
                                            Toast.makeText(RegisterActivity.this,"Successful",Toast.LENGTH_SHORT).show();
                                            gotoSettingActivity();     //TODO gotoSetting Activity

                                        }
                                        else{
                                            Toast.makeText(RegisterActivity.this, Objects.requireNonNull(task.getException()).getLocalizedMessage(),Toast.LENGTH_SHORT).show();
                                        }
                                    }
                                });

                                Toast.makeText(RegisterActivity.this,"Account created Successfully",Toast.LENGTH_SHORT).show();
                                gotoMainActivity();

                            }
                            else{
                                Toast.makeText(RegisterActivity.this,Objects.requireNonNull(task.getException()).getMessage(),Toast.LENGTH_LONG).show();
                            }
                            loadingBar.dismiss();
                        }
                    });

        }


    }

    private void gotoLoginActivity(){
        Intent loginIntent = new Intent(RegisterActivity.this,LoginActivity.class);
        startActivity(loginIntent);
        finish();
    }

    private void gotoSettingActivity(){
        Intent settingIntent = new Intent(RegisterActivity.this,SettingsActivity.class);
        settingIntent.putExtra("new_user",true);
        settingIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(settingIntent);
        finish();
    }

    private void gotoMainActivity(){
        Intent mainIntent = new Intent(RegisterActivity.this,MainActivity.class);
        mainIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(mainIntent);
        finish();
    }


}
