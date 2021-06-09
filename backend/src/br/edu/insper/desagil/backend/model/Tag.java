package br.edu.insper.desagil.backend.model;

import br.edu.insper.desagil.backend.core.firestore.FirestoreAutokeyEntity;

public class Tag extends FirestoreAutokeyEntity {
	private String obra;
	private String alvo;
	private String tipo;
	
	public Tag() {
		super();
	}

	public Tag(String alvo, String obra, String tipo) {
		super();
		this.alvo = alvo;
		this.obra = obra;
		this.tipo = tipo;
	}
	
	public String getAlvo() {
		return alvo;
	}

	public void setAlvo(String alvo) {
		this.alvo = alvo;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	
	public String getObra() {
		return obra;
	}

	
}
