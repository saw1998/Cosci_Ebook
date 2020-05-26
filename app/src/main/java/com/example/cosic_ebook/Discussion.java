package com.example.cosic_ebook;

public class Discussion {
    private String question;
    private String answer;

    public Discussion(String question) {
        this.question = question;
    }
    public Discussion(String question,String answer) {
        this.question = question;
        this.answer=answer;
    }

    public void answerTheQuestion(String answer){
        this.answer=answer;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
