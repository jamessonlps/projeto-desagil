package br.edu.insper.desagil.backend.model;

import java.util.ArrayList;
import java.util.List;

import br.edu.insper.desagil.backend.core.firestore.FirestoreAutokeyEntity;
import br.edu.insper.desagil.backend.core.firestore.FirestoreEntity;

public class Setor extends FirestoreAutokeyEntity {
	private String obra;				// key da Obra a que se refere
	private String titulo; 				// exibido pelo FrontEnd
	private String responsavel;			// exibido pelo FrontEnd
	private List<String> documentos; 	// Lista com os id's dos documentos
	private List<String> observacoes;	// Lista com as key's de observacoes
	
	public Setor() {
		super();
		this.documentos = new ArrayList<>();
		this.observacoes = new ArrayList<>();
	}
	
	public Setor(int codigo, String obra, String titulo, String pavimento) {
		super();
		this.obra = obra;
		this.titulo = titulo;
		this.documentos = new ArrayList<>();
		this.observacoes = new ArrayList<>();
	}

	
	public String getObra() {
		return obra;
	}
	
	public String getTitulo() {
		return titulo;
	}
	
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(String responsavel) {
		this.responsavel = responsavel;
	}

	public List<String> getDocumentos(){
		return documentos;
	}
	
	public void setDocumentos(List<String> documentos) {
		this.documentos = documentos;
	}

	public List<String> getObservacoes() {
		return observacoes;
	}

	public void setObservacoes(List<String> observacoes) {
		this.observacoes = observacoes;
	}
	
	public void addObservacao(String key) {
		this.observacoes.add(key);
	}
	
}
