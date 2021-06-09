package br.edu.insper.desagil.backend.model;

import java.util.ArrayList;
import java.util.List;

import br.edu.insper.desagil.backend.core.firestore.FirestoreAutokeyEntity;
import br.edu.insper.desagil.backend.core.firestore.FirestoreEntity;

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
	}
	
	public Pavimento(int codigo, String obra, String titulo, String responsavel) {
		super();
		this.obra = obra;
		this.titulo = titulo;
		this.responsavel = responsavel;
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
