package br.edu.insper.desagil.backend.model;

import java.util.List;

import br.edu.insper.desagil.backend.core.firestore.FirestoreEntity;

public class Pavimento {
	private int codigo;
	private List<Documento> documentos;
	
	public Pavimento(int codigo) {
		super();
		this.codigo = codigo;
	}

	public int getCodigo() {
		return codigo;
	}
	
	public void addDocumento(Documento doc) {
		this.documentos.add(doc);
	}
	
	
}
