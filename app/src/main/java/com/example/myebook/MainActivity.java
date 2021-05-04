package com.example.myebook;

import android.Manifest;
import android.app.ProgressDialog;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.view.Menu;
import android.widget.TextView;
import android.widget.Toast;

import com.example.myebook.authentication.LoginActivity;
import com.example.myebook.authentication.SettingsActivity;
import com.example.myebook.authentication.UserData;
import com.example.myebook.ui.add_book.BookData;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.navigation.NavigationView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.squareup.picasso.Callback;
import com.squareup.picasso.NetworkPolicy;
import com.squareup.picasso.Picasso;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.core.content.ContextCompat;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import java.util.ArrayList;

import de.hdodenhof.circleimageview.CircleImageView;

public class MainActivity extends AppCompatActivity {

    private AppBarConfiguration mAppBarConfiguration;
    private DrawerLayout drawer;
    private NavigationView navigationView;
    private ActionBarDrawerToggle toggle;

    private FirebaseAuth mAuth;
    private FirebaseUser currentUser;
    private String currentUserEmail;
    private DatabaseReference usersReference;
    private ProgressDialog loadingBar;

    private CircleImageView userImage;
    private TextView userUserName;
    private TextView userAboutMe;
    private MenuItem logoutMenu;

    private int STORAGE_PERMISSION_CODE = 1;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initializeFields();
//        addAllBooksToRecyclerView();


        setDrawerUserFields();



        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        NavigationView navigationView = findViewById(R.id.nav_view);


        mAppBarConfiguration = new AppBarConfiguration.Builder(
                R.id.nav_all_books, R.id.nav_add_book,R.id.nav_simulation, R.id.nav_setting,R.id.nav_credit)
                .setDrawerLayout(drawer)
                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        NavigationUI.setupActionBarWithNavController(this, navController, mAppBarConfiguration);
        NavigationUI.setupWithNavController(navigationView, navController);


    }

    private void initializeFields() {
        mAuth=FirebaseAuth.getInstance();
        currentUser = mAuth.getCurrentUser();
        usersReference= FirebaseDatabase.getInstance().getReference("Users");
        usersReference.keepSynced(true);

        drawer = findViewById(R.id.drawer_layout);
        navigationView = (NavigationView) findViewById(R.id.nav_view);
        View headerView = navigationView.getHeaderView(0);
        userImage=(CircleImageView)headerView.findViewById(R.id.user_image_preview);
        userUserName=(TextView)headerView.findViewById(R.id.user_username);
        userAboutMe=(TextView)headerView.findViewById(R.id.user_about_me);

//        bookDataArrayList = new ArrayList<>();
//        booksReference = FirebaseDatabase.getInstance().getReference("Books");
//        booksReference.keepSynced(true);

    }



    @Override
    protected void onStart() {
        super.onStart();

        if(currentUser == null){
            gotoLoginActivity();
        }
        else{
            verifyUserSettings();
        }

        if(Build.VERSION.SDK_INT>=Build.VERSION_CODES.M){

            if(ContextCompat.checkSelfPermission(MainActivity.this,
                    Manifest.permission.INTERNET)
                    != PackageManager.PERMISSION_GRANTED){
                requestPermissions(new String[] {Manifest.permission.INTERNET},1);
            }
            if(ContextCompat.checkSelfPermission(MainActivity.this,
                    Manifest.permission.READ_EXTERNAL_STORAGE)
                    != PackageManager.PERMISSION_GRANTED){
                requestPermissions(new String[] {Manifest.permission.READ_EXTERNAL_STORAGE},1);
            }
            if(ContextCompat.checkSelfPermission(MainActivity.this,
                    Manifest.permission.WRITE_EXTERNAL_STORAGE)
                    != PackageManager.PERMISSION_GRANTED){
                requestPermissions(new String[] {Manifest.permission.WRITE_EXTERNAL_STORAGE},1);
            }

        }

    }

    private void verifyUserSettings() {
        String currentUserId = currentUser.getUid();
        usersReference.child(currentUserId).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                if((dataSnapshot.child("userName").exists())){
//                    Toast.makeText(MainActivity.this,"Welcome",Toast.LENGTH_SHORT).show();
                }
                else {
                    gotoSettingsActivity();
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }

    private void setDrawerUserFields() {
        if (currentUser!=null) {


            usersReference.child(currentUser.getUid()).addValueEventListener(new ValueEventListener() {
                @Override
                public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                    final UserData userData = dataSnapshot.getValue(UserData.class);

                    if (!userData.getUserName().equals(""))
                        userUserName.setText(userData.getUserName());
                    else
                        userUserName.setText(userData.getEmail());

                    userAboutMe.setText(userData.getAboutMe());
                    if (userData.getImageUrl().equals(""))
                        userImage.setImageResource(R.drawable.profile_image);
                    else {

                        Picasso.get()
                                .load(userData.getImageUrl())
                                .networkPolicy(NetworkPolicy.OFFLINE)
                                .resize(70, 70)
                                .centerCrop()
                                .into(userImage, new Callback() {
                                    @Override
                                    public void onSuccess() {

                                    }

                                    @Override
                                    public void onError(Exception e) {
                                        Picasso.get()
                                                .load(userData.getImageUrl())
                                                .resize(70, 70)
                                                .centerCrop()
                                                .into(userImage);
                                    }
                                });
                    }


                }

                @Override
                public void onCancelled(@NonNull DatabaseError databaseError) {
                    Toast.makeText(MainActivity.this, "Error :" + databaseError.getMessage(), Toast.LENGTH_SHORT).show();
                }
            });
        }
        else{
            gotoLoginActivity();
        }


    }


    private void gotoLoginActivity(){
        Intent loginIntent = new Intent(this, LoginActivity.class);
        loginIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(loginIntent);
        finish();
    }

    private void gotoSettingsActivity(){
        Intent settingIntent = new Intent(MainActivity.this, SettingsActivity.class);
        settingIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(settingIntent);
        finish();
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        logoutMenu = menu.findItem(R.id.action_logout);

        logoutMenu.setOnMenuItemClickListener(new MenuItem.OnMenuItemClickListener() {
            @Override
            public boolean onMenuItemClick(MenuItem item) {
                mAuth.signOut();
                gotoLoginActivity();
                Toast.makeText(MainActivity.this,"logout",Toast.LENGTH_SHORT).show();
                return false;
            }
        });

        return true;
    }

    @Override
    public boolean onSupportNavigateUp() {
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
        return NavigationUI.navigateUp(navController, mAppBarConfiguration)
                || super.onSupportNavigateUp();
    }

//    private void addAllBooksToRecyclerView(){
//        booksReference.addListenerForSingleValueEvent(new ValueEventListener() {
//            @Override
//            public void onDataChange(@NonNull DataSnapshot snapshot) {
//                bookDataArrayList.clear();
//                BookData bookData;
////                Toast.makeText(getContext(),"populating data",Toast.LENGTH_LONG).show();
//                for(DataSnapshot item_snapshot:snapshot.getChildren()) {
//                    bookData = item_snapshot.getValue(BookData.class);
//                    bookDataArrayList.add(bookData);
//
//                }
//
//            }
//
//            @Override
//            public void onCancelled(@NonNull DatabaseError error) {
//
//            }
//        });
//
//        booksReference.addValueEventListener(new ValueEventListener() {
//            @Override
//            public void onDataChange(@NonNull DataSnapshot snapshot) {
//                bookDataArrayList.clear();
//                BookData bookData;
////                Toast.makeText(getContext(),"populating data",Toast.LENGTH_LONG).show();
//                for(DataSnapshot item_snapshot:snapshot.getChildren()) {
//                    bookData = item_snapshot.getValue(BookData.class);
//                    bookDataArrayList.add(bookData);
//
//                }
//            }
//
//            @Override
//            public void onCancelled(@NonNull DatabaseError error) {
//
//            }
//        });
//
//
//
//
//    }
//    public ArrayList<BookData> getBookDataArrayList(){
//        addAllBooksToRecyclerView();
//        return  bookDataArrayList;
//    }


}