package com.example.myebook.ui.all_books;

import android.media.Image;
import android.text.TextUtils;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.myebook.R;
import com.example.myebook.ui.add_book.BookData;
import com.squareup.picasso.Callback;
import com.squareup.picasso.NetworkPolicy;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;

import de.hdodenhof.circleimageview.CircleImageView;

public class BooksAdapter extends RecyclerView.Adapter<BooksAdapter.ViewHolder> {

    private ArrayList<BookData> bookDataArrayList;
    private OnNoteListner mOnNoteListner;

    public BooksAdapter(ArrayList<BookData> bookDataArrayList, OnNoteListner mOnNoteListner) {
        this.bookDataArrayList = bookDataArrayList;
        this.mOnNoteListner = mOnNoteListner;
    }

    @NonNull
    @Override
    public BooksAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View v= LayoutInflater.from(parent.getContext()).inflate(R.layout.books_item,parent,false);
        return new ViewHolder(v, mOnNoteListner);
    }

    @Override
    public void onBindViewHolder(@NonNull final BooksAdapter.ViewHolder holder, int position) {

        final BookData bookView = bookDataArrayList.get(position);
        holder.itemView.setTag(bookView);
        holder.aUserName.setText(bookView.getaUserName());
        holder.aAboutMe.setText(bookView.getaAboutMe());
        holder.aDate.setText(bookView.getaDate());
        // ===============================================================================
//        System.out.println("##################################################################################");
//        System.out.println(bookView.getBookCover());
        try {
//            Picasso.get()
//                    .load(bookView.getBookCover())
//                    .resize(50, 50)
//                    .centerCrop()
//                    .into(holder.bookCover);
//

            Picasso.get()
                    .load(bookView.getBookCover())
                    .networkPolicy(NetworkPolicy.OFFLINE)
                    .resize(50, 50)
                    .centerCrop()
                    .into(holder.bookCover, new Callback() {
                        @Override
                        public void onSuccess() {

                        }

                        @Override
                        public void onError(Exception e) {
                            Picasso.get()
                                    .load(bookView.getBookCover())
                                    .resize(50, 50)
                                    .centerCrop()
                                    .into(holder.bookCover);
                        }
                    });
        }
        catch (Exception e){

        }

    }

    @Override
    public int getItemCount() {
        return bookDataArrayList.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener{

//        public CircleImageView aImage;
        public TextView aUserName;
        public TextView aAboutMe;
        public TextView aDate;
        public CircleImageView bookCover;
//        public TextView aAnswer;
        OnNoteListner onNoteListner;

        public ViewHolder(@NonNull View itemView,OnNoteListner onNoteListner) {
            super(itemView);

            aUserName = (TextView) itemView.findViewById(R.id.author_name);
            aAboutMe = (TextView) itemView.findViewById(R.id.about_author);
            aDate = (TextView) itemView.findViewById(R.id.publish_date);
            bookCover = (CircleImageView) itemView.findViewById(R.id.iv_book_cover);
//            aAnswer = (TextView) itemView.findViewById(R.id.);
//            aImage = (CircleImageView) itemView.findViewById(R.id.answerer_image);

            this.onNoteListner = onNoteListner;

            itemView.setOnClickListener(this);

        }

        @Override
        public void onClick(View v) {
            onNoteListner.onNoteClick(getAdapterPosition());
        }
    }

    public interface OnNoteListner{
        void onNoteClick(int position);
    }
}
