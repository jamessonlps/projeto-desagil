package br.edu.insper.desagil.backend.model;

import br.edu.insper.desagil.backend.core.firestore.FirestoreAutokeyEntity;

public class Tag extends FirestoreAutokeyEntity {
	private int obra;
	private int alvo;
	private String tipo;
	
	public Tag() {
		super();
	}

	public Tag(int id, int alvo, int obra, String tipo) {
		super();
		this.alvo = alvo;
		this.obra = obra;
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
	
	public int getObra() {
		return obra;
	}

	
}
