package com.example.cosic_ebook;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.MenuItem;

import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;


import com.google.android.material.navigation.NavigationView;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {

    private DrawerLayout drawer;
    private Toolbar toolbar;
    ActionBarDrawerToggle toggle;
    ArrayList<Project> projects;
    RecyclerView recyclerView;
    RecyclerView.LayoutManager layoutManager;
    RecyclerView.Adapter myAdapter;


    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        recyclerView=(RecyclerView) findViewById(R.id.project_list);
        recyclerView.setHasFixedSize(true);

        layoutManager = new LinearLayoutManager(this);
        recyclerView.setLayoutManager(layoutManager);
        projects = new ArrayList<Project>();
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));
        projects.add(new Project("Pendulum"));


        myAdapter= new ProjectAdapter(projects);
        recyclerView.setAdapter(myAdapter);
        

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////


        toolbar=(Toolbar)findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        drawer=findViewById(R.id.drawer_layout);
        NavigationView navigationView=findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);

        toggle=new ActionBarDrawerToggle(this,drawer,toolbar,R.string.navigation_drawer_open,R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
        switch (menuItem.getItemId()){
            case R.id.menu_projects:
                drawer.closeDrawers();
                break;
//            case R.id.menu_projects:
//                getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,new AllProjectFragment()).commit();
//                break;
        }
        return true;
    }

    @Override
    public void onBackPressed() {
        if(drawer.isDrawerOpen(GravityCompat.START)){
            drawer.closeDrawer(GravityCompat.START);
        }
        else {
            super.onBackPressed();
        }
    }
}
