package br.edu.insper.desagil.backend.model;

import java.util.ArrayList;
import java.util.List;

import br.edu.insper.desagil.backend.core.firestore.FirestoreEntity;

public class Pavimento extends FirestoreEntity {
	private int codigo; // código do Pavimento --> Pode ser da forma AB0123 --> para outras referencias dentro dele, podemos complementar AB0123___
	private int obra; 
	private String titulo; // exibido pelo FrontEnd
	private String responsavel;
	private List<Integer> documentos; // Lista com os id's dos documentos
	private List<Integer> apartamentos; // Lista com os id's dos apartamentos
	
	public Pavimento() {
		super();
		// não faz nada
	}
	
	public Pavimento(int codigo, int obra, String titulo, String responsavel) {
		super();
		this.codigo = codigo;
		this.obra = obra;
		this.titulo = titulo;
		this.responsavel = responsavel;
		this.documentos = new ArrayList<>();
		
	}

	public int getCodigo() {
		return codigo;
	}
	
	public int getObra() {
		return obra;
	}
	
	public String getTitulo() {
		return titulo;
	}

	
	public List<Integer> getApartamentos() {
		return apartamentos;
	}

	public void setApartamentos(List<Integer> apartamentos) {
		this.apartamentos = apartamentos;
	}

	public String getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(String responsavel) {
		this.responsavel = responsavel;
	}

	public List<Integer> getDocumentos(){
		return documentos;
	}
	
	public void addDocumento(Documento doc) {
		this.documentos.add(doc.getCodigo());
	}

	@Override // -- método requerido pelo FirestoreEntity
	public String key() {
		return Integer.toString(codigo);
	}
	
	
}
