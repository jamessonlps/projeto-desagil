package br.edu.insper.desagil.backend.model;

import java.util.Date;

import br.edu.insper.desagil.backend.core.firestore.FirestoreEntity;

public class Post extends FirestoreEntity{
	private Date date;
	private String title;
	private String content;
	
	public Post(Date date, String title, String content) {
		super();
		this.date = date;
		this.title = title;
		this.content = content;
	}
	
	public Date getDate() {
		return this.date;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public String key() {
		// TODO Auto-generated method stub
		return null;
	}

}
