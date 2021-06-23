package br.edu.insper.desagil.backend.model;

import java.util.ArrayList;
import java.util.List;

import br.edu.insper.desagil.backend.core.firestore.FirestoreAutokeyEntity;

public class Pavimento extends FirestoreAutokeyEntity {
	private String obra;					// Key da Obra a que se refere
	private String titulo; 					// exibido pelo FrontEnd
	private String responsavel;				// exibido pelo Front
	private List<String> documentos; 		// Lista com os id's dos Documentos
	private List<String> setores; 			// Lista com os id's dos Setores
	private List<String> observacoes;		// Lista com as keys das Observações
	
	public Pavimento() {
		super();
		this.documentos = new ArrayList<>();
		this.observacoes = new ArrayList<>();
		this.setores = new ArrayList<>();
	}
	
	public Pavimento(String obra, String titulo, String responsavel) {
		super();
		this.obra = obra;
		this.titulo = titulo;
		this.responsavel = responsavel;
		this.documentos = new ArrayList<>();
		this.observacoes = new ArrayList<>();
		this.setores = new ArrayList<>();
	}
	
	public Pavimento(String obra, String titulo, String responsavel, List<String> documentos) {
		super();
		this.obra = obra;
		this.titulo = titulo;
		this.responsavel = responsavel;
		this.documentos = documentos;
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

	public List<String> getSetores() {
		return setores;
	}

	public void setSetores(List<String> setores) {
		this.setores = setores;
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
	
	public void addDocumento(String key) {
		this.documentos.add(key);
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
