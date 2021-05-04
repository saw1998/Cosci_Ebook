package com.example.myebook.ui.all_books;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.myebook.MainActivity;
import com.example.myebook.R;
import com.example.myebook.ui.add_book.BookData;
import com.firebase.ui.database.FirebaseRecyclerAdapter;
import com.firebase.ui.database.FirebaseRecyclerOptions;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

public class AllBooksFragment extends Fragment implements BooksAdapter.OnNoteListner {

    private RecyclerView recyclerView;
    private RecyclerView.Adapter booksAdapter;
    private RecyclerView.LayoutManager layoutManager;
//    private FloatingActionButton addBook;
    View root;

    private ArrayList<BookData> bookDataArrayList;

    private DatabaseReference booksReference;

    private BooksAdapter.OnNoteListner mOnNoteListner;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        root = inflater.inflate(R.layout.fragment_all_book, container, false);
        initializeFields(root);

        addAllBooksToRecyclerView();

//        addBook.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//
//            }
//        });

//        booksAdapter = new BooksAdapter(bookDataArrayList,this);
//        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
//        recyclerView.setAdapter(booksAdapter);
//        recyclerView.setItemAnimator(new DefaultItemAnimator());



        return root;
    }


    //    @Override
//    public void onStart() {
//        super.onStart();
//
//        FirebaseRecyclerOptions<BookData> options =
//                new FirebaseRecyclerOptions.Builder<BookData>()
//                .setQuery(booksReference,BookData.class)
//                .build();
//
//        FirebaseRecyclerAdapter<BookData,BooksAdapter.ViewHolder> adapter=
//                new FirebaseRecyclerAdapter<BookData, BooksAdapter.ViewHolder>(options) {
//                    @Override
//                    protected void onBindViewHolder(@NonNull BooksAdapter.ViewHolder viewHolder, int i, @NonNull BookData bookData) {
//
//                        DatabaseReference getAbookRef = getRef(i).getRef();
//                        DatabaseReference getAboutMeRef = getRef(i).child("aAboutMe").getRef();
//                        DatabaseReference getDateRef = getRef(i).child("aDate").getRef();
//
//                        getAbookRef.addValueEventListener(new ValueEventListener() {
//                            @Override
//                            public void onDataChange(@NonNull DataSnapshot snapshot) {
//                                if(snapshot.exists()){
//                                    root
//                                }
//                            }
//
//                            @Override
//                            public void onCancelled(@NonNull DatabaseError error) {
//
//                            }
//                        })
//
//                    }
//
//                    @NonNull
//                    @Override
//                    public BooksAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
//                        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.books_item,parent,false);
//                        return new BooksAdapter.ViewHolder(v, mOnNoteListner);
//                    }
//                }
//
//    }

    private void initializeFields(View root){

        recyclerView=root.findViewById(R.id.books_recycler_view);
        recyclerView.setHasFixedSize(true);
        layoutManager=new LinearLayoutManager(getContext());
        recyclerView.setLayoutManager(layoutManager);
        bookDataArrayList = new ArrayList<>();

        booksReference = FirebaseDatabase.getInstance().getReference("Books");
        booksReference.keepSynced(true);
//        addBook = root.findViewById(R.id.add_book_fab);
    }

    private void addAllBooksToRecyclerView(){
//        booksReference.addListenerForSingleValueEvent(new ValueEventListener() {
//            @Override
//            public void onDataChange(@NonNull DataSnapshot snapshot) {
//                bookDataArrayList.clear();
//                BookData bookData;
//                Toast.makeText(getContext(),"populating data",Toast.LENGTH_LONG).show();
//                for(DataSnapshot item_snapshot:snapshot.getChildren()) {
//                    bookData = item_snapshot.getValue(BookData.class);
//                    bookDataArrayList.add(bookData);
//
//                }
//                attachAdaptertoRecyclerView();
//
//            }
//
//            @Override
//            public void onCancelled(@NonNull DatabaseError error) {
//
//            }
//
//        });

        booksReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                bookDataArrayList.clear();
                BookData bookData;
//                Toast.makeText(getContext(),"populating value event listner data",Toast.LENGTH_LONG).show();
                for(DataSnapshot item_snapshot:snapshot.getChildren()) {
                    bookData = item_snapshot.getValue(BookData.class);
                    bookDataArrayList.add(bookData);

                }
                attachAdaptertoRecyclerView();
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });

        //TODO add loading bar



    }

    private void attachAdaptertoRecyclerView(){
        booksAdapter = new BooksAdapter(bookDataArrayList,this);
        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        recyclerView.setAdapter(booksAdapter);
        recyclerView.setItemAnimator(new DefaultItemAnimator());
    }

    @Override
    public void onNoteClick(int position) {
        Intent intent = new Intent(getContext(),ShowBookDataActivity.class);
        intent.putExtra("iwonder",bookDataArrayList.get(position).getiWonder());
        intent.putExtra("iplan",bookDataArrayList.get(position).getiPlanTo());
        intent.putExtra("ifound",bookDataArrayList.get(position).getiFound());
        intent.putExtra("ithink",bookDataArrayList.get(position).getiThink());
        intent.putExtra("username",bookDataArrayList.get(position).getaUserName());
        intent.putExtra("aboutme",bookDataArrayList.get(position).getaAboutMe());
        intent.putExtra("simulationKey",bookDataArrayList.get(position).getSimulationsRefKey());
        startActivity(intent);
    }
}