package com.example.myebook.authentication;

public class UserData {
    private String userId;
    private String userName;
    private String email;
    private String imageUrl;
    private String aboutMe;

    public UserData(String userId, String userName, String email, String imageUrl, String aboutMe) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.imageUrl = imageUrl;
        this.aboutMe = aboutMe;
    }

    public UserData() {
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }
}
