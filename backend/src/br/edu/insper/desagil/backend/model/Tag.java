package br.edu.insper.desagil.backend.model;

import br.edu.insper.desagil.backend.core.firestore.FirestoreEntity;

public class Tag extends FirestoreEntity {
	private int id;
	private int alvo;
	private String tipo;
	
	public Tag() {
		super();
	}

	public Tag(int id, int alvo, String tipo) {
		super();
		this.id = id;
		this.alvo = alvo;
		this.tipo = tipo;
	}
	
	public int getAlvo() {
		return alvo;
	}

	public void setAlvo(int alvo) {
		this.alvo = alvo;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public int getId() {
		return id;
	}

	@Override
	public String key() {
		// TODO Auto-generated method stub
		return Integer.toString(id);
	}
	
}