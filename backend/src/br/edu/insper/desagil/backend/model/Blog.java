package br.edu.insper.desagil.backend.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import br.edu.insper.desagil.backend.core.firestore.FirestoreEntity;

public class Blog extends FirestoreEntity{
	private int codigo; //id do pavimento a que se refere
	private List<Post> posts;

	public Blog(int codigo) {
		this.codigo = codigo;
		this.posts = new ArrayList<>();
	}

	public int getCodigo() {
		return this.codigo;
	}

	public List<Post> getPosts() {
		return Collections.unmodifiableList(this.posts);
	}

	public void addPost(Date date, String title, String content) {
		Post post = new Post(date, title, content);
		this.posts.add(post);
	}

	@Override
	public String key() {
		// TODO Auto-generated method stub
		return null;
	}

}
