package com.example.myebook.ui.add_book;

import android.app.ProgressDialog;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.util.Log;
import android.util.Pair;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;

import com.example.myebook.MainActivity;
import com.example.myebook.R;
import com.example.myebook.authentication.SettingsActivity;
import com.example.myebook.authentication.UserData;
import com.example.myebook.ui.add_book.components.ComponentTable;
import com.example.myebook.ui.add_book.components.ComponentsEditor;
import com.example.myebook.ui.add_book.components.ExpData;
import com.example.myebook.ui.all_books.ShowBookDataActivity;
import com.example.myebook.ui.simulation.Simulation2;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.squareup.picasso.Picasso;
import com.theartofdev.edmodo.cropper.CropImage;
import com.theartofdev.edmodo.cropper.CropImageView;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

import static android.app.Activity.RESULT_OK;

public class AddBookFragment extends Fragment {

    final int I_WONDER = 1;
    final int I_PLAN = 2;
    final int I_FOUND = 3;
    final int I_THINK = 4;
    final int SIMULATION = 5;
    final int IMAGE_REQUEST=6;
    private static final int PERMISSION_REQUEST_CODE = 100;


    private DatabaseReference booksReference;
    private DatabaseReference draftReference;
    private UserData userData;
    private DatabaseReference currentUserReference;
    private DatabaseReference simulationsReference;
    private FirebaseAuth mAuth;
    private FirebaseUser currentUser;
    private ProgressDialog loadingBar;

    private Button btnBookCover;
    private Button btnIwonder;
    private Button btnIplan;
    private Button btnIfound;
    private Button btnIthink;
//    private Button btnDraft;
    private Button btnPost;
    private Button btnSimulation;

    private BookData bookData;
    private ArrayList<ExpData> expDataArrayList;

    private boolean canUploadBookCover = false;
    private boolean bookCoverUploaded = false;
    private Intent bookCoverData;
    private int cropImageResultCode = 0;
    private StorageReference bookCoverImageRef;
    private String bookCoverDownloadUrl;



    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
//        galleryViewModel =
//                ViewModelProviders.of(this).get(GalleryViewModel.class);
        View root = inflater.inflate(R.layout.fragment_add_book, container, false);

        initializeFields(root);
        setButtonClickListers();

//        Toast.makeText(getContext(),"Add Book Fragment",Toast.LENGTH_LONG).show();

        if(savedInstanceState!=null){
            bookData.setiThink(savedInstanceState.getString("iWonder"));
            bookData.setiFound(savedInstanceState.getString("iFound"));
            bookData.setiWonder(savedInstanceState.getString("iWonder"));
            bookData.setiPlanTo(savedInstanceState.getString("iPlan"));
            expDataArrayList =(ArrayList<ExpData>) savedInstanceState.getSerializable("allSimulations");
        }
        loadBookFromDraft();
        return root;
    }

    private void initializeFields(View root){
        btnBookCover = (Button) root.findViewById(R.id.btn_book_cover);
        btnIwonder = (Button) root.findViewById(R.id.i_wonder);
        btnIplan = (Button) root.findViewById(R.id.i_plan);
        btnIfound = (Button) root.findViewById(R.id.i_found);
        btnIthink = (Button) root.findViewById(R.id.i_think);
//        btnDraft = (Button) root.findViewById(R.id.save_to_draft);
        btnPost = (Button) root.findViewById(R.id.post);
        btnSimulation=(Button) root.findViewById(R.id.experiment_set);

        bookData = new BookData();
        expDataArrayList = new ArrayList<>();

        mAuth=FirebaseAuth.getInstance();
        currentUser=mAuth.getCurrentUser();
        currentUserReference= FirebaseDatabase.getInstance().getReference("Users").child(currentUser.getUid());
        currentUserReference.keepSynced(true);
        booksReference = FirebaseDatabase.getInstance().getReference("Books");
        booksReference.keepSynced(true);
        simulationsReference = FirebaseDatabase.getInstance().getReference("Simulations");
        simulationsReference.keepSynced(true);
        draftReference = FirebaseDatabase.getInstance().getReference("Drafts");
        draftReference.keepSynced(true);

        loadingBar=new ProgressDialog(getContext());

        bookCoverImageRef = FirebaseStorage.getInstance().getReference("book_cover_images");
        bookCoverDownloadUrl = "";

    }

    @Override
    public void onDetach() {
        setBookDraftToDatabase();
//        System.out.println("this activity paused333333333333333########################################");
        super.onDetach();
    }

//    @Override
//    public void onPause() {
//        super.onPause();
//        System.out.println("this activity paused333333333333333########################################");
//        setBookDraftToDatabase();
//    }

    private void setButtonClickListers(){

        final Intent textIntent = new Intent(getContext(), ComponentsEditor.class);

        btnBookCover.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent galleryIntent = new Intent();
                galleryIntent.setAction(Intent.ACTION_GET_CONTENT);
                galleryIntent.setType("image/*");
                startActivityForResult(galleryIntent,IMAGE_REQUEST);
            }
        });

        btnIwonder.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                textIntent.putExtra("title","I Wonder...");
                textIntent.putExtra("result_code",I_WONDER);
                textIntent.putExtra("text",bookData.getiWonder());
                startActivityForResult(textIntent,I_WONDER);
            }
        });

        btnIplan.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                textIntent.putExtra("title","So, I plan to...");
                textIntent.putExtra("result_code",I_PLAN);
                textIntent.putExtra("text",bookData.getiPlanTo());
                startActivityForResult(textIntent,I_PLAN);
            }
        });

        btnIfound.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                textIntent.putExtra("title","I found...");
                textIntent.putExtra("result_code",I_FOUND);
                textIntent.putExtra("text",bookData.getiFound());
                startActivityForResult(textIntent,I_FOUND);
            }
        });

        btnIthink.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                textIntent.putExtra("title","So, I think...");
                textIntent.putExtra("result_code",I_THINK);
                textIntent.putExtra("text",bookData.getiThink());
                startActivityForResult(textIntent,I_THINK);
            }
        });

        btnSimulation.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent arrayIntent = new Intent(getContext(), ComponentTable.class);
                arrayIntent.putExtra("result_code",SIMULATION);
                arrayIntent.putExtra("simulation",expDataArrayList);
                startActivityForResult(arrayIntent,SIMULATION);
            }
        });


        btnPost.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(bookData.getiWonder().equals("")  && bookData.getiPlanTo().equals("") && bookData.getiFound().equals("") && bookData.getiThink().equals("")){
                    Toast.makeText(getContext(),"All the fields can't be empty",Toast.LENGTH_LONG).show();
                }
                else{
                    Toast.makeText(getContext(),"Please wait ...",Toast.LENGTH_LONG).show();
                    sendBookToDatabase();
                }
            }
        });
    }



    @Override
    public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if(resultCode == I_WONDER){
            bookData.setiWonder(data.getStringExtra("inputText"));
        }
        else if(resultCode == I_PLAN){
            bookData.setiPlanTo(data.getStringExtra("inputText"));
        }
        else if(resultCode == I_FOUND){
            bookData.setiFound(data.getStringExtra("inputText"));
        }
        else if(resultCode == I_THINK){
            bookData.setiThink(data.getStringExtra("inputText"));
        }
        else if(resultCode == SIMULATION){
            assert data != null;
            expDataArrayList.clear();
            expDataArrayList=((ArrayList<ExpData>) data.getSerializableExtra("simulation"));
        }
        else if(requestCode==IMAGE_REQUEST &&  resultCode == RESULT_OK && data!=null){
            Uri imageUri = data.getData();

            CropImage.activity()
                    .setGuidelines(CropImageView.Guidelines.ON)
                    .setAspectRatio(1,1)
                    .start(getContext(),this);
        }
        else if(requestCode == CropImage.CROP_IMAGE_ACTIVITY_REQUEST_CODE){

            canUploadBookCover = true;
            bookCoverData = data;
            cropImageResultCode = resultCode;
        }
        else{
            Toast.makeText(getContext(),"Error Occured, Please try again! "+resultCode,Toast.LENGTH_LONG).show();
        }
    }

    private void setBookDraftToDatabase(){

        final HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("iWonder", bookData.getiWonder());
        hashMap.put("iPlanTo", bookData.getiPlanTo());
        hashMap.put("iFound", bookData.getiFound());
        hashMap.put("iThink", bookData.getiThink());

        final DatabaseReference draftBookReference = draftReference.child(currentUser.getUid()).child("Book");
        final DatabaseReference draftSimulationReference = draftReference.child(currentUser.getUid()).child("Simulation");

        draftBookReference.setValue(hashMap).addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                if (task.isSuccessful()) {
                   // Toast.makeText(getContext(), "Saving to draft...\nYou may need to upload the book cover again!", Toast.LENGTH_LONG).show();
                } else {
                   // Toast.makeText(getContext(), task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                }

            }
        });

        HashMap<String,Object> hMap = new HashMap<>();
        String ri,res;
        int prefix=1000;
        for(int i=0;i<expDataArrayList.size();i++){
            ri=expDataArrayList.get(i).getRi().replace('.','d');
            if(ri.equals("")){
                continue;
            }
            ri = prefix +ri;
            prefix++;
            res=expDataArrayList.get(i).getExpResult();
            hMap.put(ri,res);
        }

        draftSimulationReference.setValue(hMap).addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
//                if(task.isSuccessful())
//                   // Toast.makeText(getContext(),"Saved...",Toast.LENGTH_SHORT).show();
//                else
//                    //Toast.makeText(getContext(),task.getException().getMessage(),Toast.LENGTH_LONG).show();
            }
        });
    }

    public void loadBookFromDraft(){
        final DatabaseReference draftBookReference = draftReference.child(currentUser.getUid()).child("Book");
        final DatabaseReference draftSimulationReference = draftReference.child(currentUser.getUid()).child("Simulation");

        draftBookReference.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                bookData = snapshot.getValue(BookData.class);
                if(bookData==null){
                    bookData=new BookData();
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(getContext(),error.toString(),Toast.LENGTH_LONG).show();
            }
        });


        draftSimulationReference.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                expDataArrayList.clear();

                for(DataSnapshot item_snapshot:snapshot.getChildren()){
                    ExpData expData=new ExpData();
                  try{
                      expData.setRi(item_snapshot.getKey().substring(4).replace('d','.'));
                      expData.setExpResult(item_snapshot.getValue().toString());
                      expDataArrayList.add(expData);
                  } catch (Exception e){

                  }

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(getContext(),error.toString(),Toast.LENGTH_LONG).show();
            }
        });

    }


    @Override
    public void onSaveInstanceState(@NonNull Bundle outState) {
        outState.putString("iWonder",bookData.getiWonder());
        outState.putString("iPlan",bookData.getiPlanTo());
        outState.putString("iFound",bookData.getiFound());
        outState.putString("iThink",bookData.getiThink());
        outState.putSerializable("allSimulations",expDataArrayList);


        super.onSaveInstanceState(outState);
    }


//    private boolean checkPermission() {
//        int result = ContextCompat.checkSelfPermission(getContext(), android.Manifest.permission.WRITE_EXTERNAL_STORAGE);
//        if (result == PackageManager.PERMISSION_GRANTED) {
//            return true;
//        } else {
//            return false;
//        }
//    }
//
//    private void requestPermission() {
//        if (ActivityCompat.shouldShowRequestPermissionRationale(getActivity(), android.Manifest.permission.WRITE_EXTERNAL_STORAGE)) {
//            Toast.makeText(getContext(), "Write External Storage permission allows us to save files. Please allow this permission in App Settings.", Toast.LENGTH_LONG).show();
//        } else {
//            ActivityCompat.requestPermissions(getActivity(), new String[]{android.Manifest.permission.WRITE_EXTERNAL_STORAGE}, PERMISSION_REQUEST_CODE);
//        }
//    }
//
//
//    public void saveBookToDraft(){
//        String state = Environment.getExternalStorageState();
//        if (Environment.MEDIA_MOUNTED.equals(state)) {
//            if (Build.VERSION.SDK_INT > = 23) {
//                if (checkPermission()) {
//                    String path = Environment.getExternalStorageDirectory().toString();
//                    File file = new File(path, "Ebook/Draft/lastSavedImage"+".jpg");
//                    if (!file.exists()) {
//                        Log.d("path", file.toString());
//                        try {
//                            FileOutputStream fos = new FileOutputStream(file);
//                            bitmap.compress(Bitmap.CompressFormat.JPEG, 100, fos);
//                            fos.flush();
//                            fos.close();
//                        } catch (Exception e) {
//                            e.printStackTrace();
//                        }
//                    }
//                } else {
//                    requestPermission(); // Code for permission
//                }
//            } else {
//                String path = Environment.getExternalStorageDirectory().toString();
//                File file = new File(path, "UniqueFileName"+".jpg");
//                if (!file.exists()) {
//                    Log.d("path", file.toString());
//                    FileOutputStream fos = null;
//                    try {
//                        fos = new FileOutputStream(file);
//                        bitmap.compress(Bitmap.CompressFormat.JPEG, 100, fos);
//                        fos.flush();
//                        fos.close();
//                    } catch (java.io.IOException e) {
//                        e.printStackTrace();
//                    }
//                }
//            }
//        }
//    }

    private void sendBookToDatabase(){
        loadingBar.setTitle("Sending to database!");
        loadingBar.setMessage("Please wait...");
        loadingBar.setCanceledOnTouchOutside(true);
        loadingBar.show();

        currentUserReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                userData = snapshot.getValue(UserData.class);
//                Toast.makeText(getContext(),"retrival user info successful",Toast.LENGTH_SHORT).show();
                Date today = new Date();
                SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy");
                String date = DATE_FORMAT.format(today);

                final HashMap<String, Object> hashMap = new HashMap<>();
                hashMap.put("iWonder", bookData.getiWonder());
                hashMap.put("iPlanTo", bookData.getiPlanTo());
                hashMap.put("iFound", bookData.getiFound());
                hashMap.put("iThink", bookData.getiThink());
                hashMap.put("aUserName", userData.getUserName());
                hashMap.put("aAboutMe", userData.getAboutMe());
                hashMap.put("aDate", date);

                final DatabaseReference simulationTableReferece = simulationsReference.push();
                String simulationTablekey = simulationTableReferece.getKey();
                hashMap.put("simulationsRefKey", simulationTablekey);

                final DatabaseReference thisBookReference = booksReference.push();
                String thisBookRefKey = thisBookReference.getKey();/////////////////////////////////////

//                sendBookCoverToDatabase(thisBookRefKey);


                //////==============================================================================================


                bookCoverDownloadUrl = "";
                if (canUploadBookCover) {
                    CropImage.ActivityResult result = CropImage.getActivityResult(bookCoverData);
                    if (cropImageResultCode == RESULT_OK) {
                        Uri resultUri = result.getUri();

                        final StorageReference filePath = bookCoverImageRef.child(thisBookRefKey + ".jpg");
                        //            loadingBar.setTitle("Uploading Image!");
                        //            loadingBar.setMessage("Please wait...");
                        //            loadingBar.setCanceledOnTouchOutside(true);
                        //            loadingBar.show();

                        //            final String downloadUrl;

                        filePath.putFile(resultUri).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                            @Override
                            public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {

                                filePath.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
                                    @Override
                                    public void onSuccess(Uri uri) {
                                        bookCoverDownloadUrl = uri.toString();

                                        //=========================================================================

                                        hashMap.put("bookCover",bookCoverDownloadUrl);

                                        thisBookReference.setValue(hashMap).addOnCompleteListener(new OnCompleteListener<Void>() {
                                            @Override
                                            public void onComplete(@NonNull Task<Void> task) {
                                                if(task.isSuccessful())
                                                    Toast.makeText(getContext(),"sending ...",Toast.LENGTH_SHORT).show();
                                                else
                                                    Toast.makeText(getContext(),task.getException().getMessage(),Toast.LENGTH_SHORT).show();
                                            }
                                        });

                                        HashMap<String,Object> hMap = new HashMap<>();
                                        String ri,res;
                                        int prefix=1000;
                                        for(int i=0;i<expDataArrayList.size();i++){
                                            ri=expDataArrayList.get(i).getRi().replace('.','d');
                                            ri = prefix + ri;
                                            prefix++;
                                            res=expDataArrayList.get(i).getExpResult();
                                            hMap.put(ri,res);
                                        }

                                        simulationTableReferece.setValue(hMap).addOnCompleteListener(new OnCompleteListener<Void>() {
                                            @Override
                                            public void onComplete(@NonNull Task<Void> task) {
                                                if(task.isSuccessful())
                                                    Toast.makeText(getContext(),"Sent",Toast.LENGTH_SHORT).show();
                                                else
                                                    Toast.makeText(getContext(),task.getException().getMessage(),Toast.LENGTH_LONG).show();
                                            }
                                        });


                                    }
                                });
                            }
                        });


                    }
                }
                else{
                    hashMap.put("bookCover",bookCoverDownloadUrl);

                    thisBookReference.setValue(hashMap).addOnCompleteListener(new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(@NonNull Task<Void> task) {
                            if(task.isSuccessful())
                                Toast.makeText(getContext(),"sending ...",Toast.LENGTH_SHORT).show();
                            else
                                Toast.makeText(getContext(),task.getException().getMessage(),Toast.LENGTH_SHORT).show();
                        }
                    });

                    HashMap<String,Object> hMap = new HashMap<>();
                    String ri,res;
                    int prefix=1000;
                    for(int i=0;i<expDataArrayList.size();i++){
                        ri=expDataArrayList.get(i).getRi().replace('.','d');
                        ri = prefix + ri;
                        prefix++;
                        res=expDataArrayList.get(i).getExpResult();
                        hMap.put(ri,res);
                    }

                    simulationTableReferece.setValue(hMap).addOnCompleteListener(new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(@NonNull Task<Void> task) {
                            if(task.isSuccessful())
                                Toast.makeText(getContext(),"Sent",Toast.LENGTH_SHORT).show();
                            else
                                Toast.makeText(getContext(),task.getException().getMessage(),Toast.LENGTH_LONG).show();
                        }
                    });
                }

                //==============================================================================================
/*
                hashMap.put("bookCover",bookCoverDownloadUrl);
                System.out.println(hashMap);

                thisBookReference.setValue(hashMap).addOnCompleteListener(new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        if(task.isSuccessful())
                            Toast.makeText(getContext(),"sending ...",Toast.LENGTH_SHORT).show();
                        else
                            Toast.makeText(getContext(),task.getException().getMessage(),Toast.LENGTH_SHORT).show();
                    }
                });

                HashMap<String,Object> hMap = new HashMap<>();
                String ri,res;
                for(int i=0;i<expDataArrayList.size();i++){
                    ri=expDataArrayList.get(i).getRi().replace('.','d');
                    res=expDataArrayList.get(i).getExpResult();
                    hMap.put(ri,res);
                }

                simulationTableReferece.setValue(hMap).addOnCompleteListener(new OnCompleteListener<Void>() {
                    @Override
                    public void onComplete(@NonNull Task<Void> task) {
                        if(task.isSuccessful())
                            Toast.makeText(getContext(),"Sent",Toast.LENGTH_SHORT).show();
                        else
                            Toast.makeText(getContext(),task.getException().getMessage(),Toast.LENGTH_LONG).show();
                    }
                });
                */

            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {
                Toast.makeText(getContext(),"Error :"+error.getMessage(),Toast.LENGTH_LONG).show();
            }
        });
        loadingBar.dismiss();
    }

    private void sendBookCoverToDatabase(String uidBook){
        bookCoverDownloadUrl = "";
        if(!canUploadBookCover){
            return;
        }
        CropImage.ActivityResult result = CropImage.getActivityResult(bookCoverData);
        if (cropImageResultCode == RESULT_OK) {
            Uri resultUri = result.getUri();

            final StorageReference filePath = bookCoverImageRef.child(uidBook + ".jpg");
//            loadingBar.setTitle("Uploading Image!");
//            loadingBar.setMessage("Please wait...");
//            loadingBar.setCanceledOnTouchOutside(true);
//            loadingBar.show();

//            final String downloadUrl;

            filePath.putFile(resultUri).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                @Override
                public void onSuccess(UploadTask.TaskSnapshot taskSnapshot){

                    filePath.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
                        @Override
                        public void onSuccess(Uri uri) {
                            bookCoverDownloadUrl = uri.toString();
//                            successfulImageUpload = true;
//                            Toast.makeText(SettingsActivity.this, "Profile Image Uploaded successfully", Toast.LENGTH_SHORT).show();
//                                Toast.makeText(SettingsActivity.this,"Picasso run",Toast.LENGTH_SHORT).show();
//                            Picasso.get()
//                                    .load(profileImageDownloadUrl)
//                                    .resize(250, 250)
//                                    .centerCrop()
//                                    .into(profile_image);
                        }
                    });
//                    loadingBar.dismiss();
                }
            });


        }
    }
}