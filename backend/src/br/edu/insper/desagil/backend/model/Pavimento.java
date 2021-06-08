package br.edu.insper.desagil.backend.model;

import java.util.ArrayList;
import java.util.List;

import br.edu.insper.desagil.backend.core.firestore.FirestoreEntity;

public class Pavimento extends FirestoreEntity {
	private int codigo; 					// código do Pavimento 
	private int obra; 						// codigo da Obra a que se refere
	private String titulo; 					// exibido pelo FrontEnd
	private String responsavel;				// exibido pelo Front
	private List<Integer> documentos; 		// Lista com os id's dos Documentos
	private List<Integer> setores; 			// Lista com os id's dos Setores
	private List<String> observacoes;		// Lista com as keys das Observações
	
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
		this.observacoes = new ArrayList<>();
		
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

	
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public List<Integer> getSetores() {
		return setores;
	}

	public void setSetores(List<Integer> setores) {
		this.setores = setores;
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
	
	public List<String> getObservacoes() {
		return observacoes;
	}
	
	public void setObservacoes(List<String> observacoes) {
		this.observacoes = observacoes;
	}

	@Override // -- método requerido pelo FirestoreEntity
	public String key() {
		return Integer.toString(codigo);
	}
	
	
}
