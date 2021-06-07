package br.edu.insper.desagil.backend.model;

import java.util.ArrayList;
import java.util.List;

import br.edu.insper.desagil.backend.core.firestore.FirestoreEntity;

public class Setor extends FirestoreEntity {
	private int codigo; 				// código do Pavimento --> Pode ser da forma AB0123 --> para outras referencias dentro dele, podemos complementar AB0123___
	private int obra;
	private String titulo; 				// exibido pelo FrontEnd
	private String responsavel;
	private int idPavimento;			// id do pavimento a que se refere
	private List<Integer> documentos; 	// Lista com os id's dos documentos
	
	public Setor() {
		super();
		// não faz nada
	}
	
	public Setor(int codigo, int obra, String titulo, int idPavimento) {
		super();
		this.codigo = codigo;
		this.obra = obra;
		this.titulo = titulo;
		this.idPavimento = idPavimento;
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
	
	
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public int getIdPavimento() {
		return idPavimento;
	}

	public void setIdPavimento(int idPavimento) {
		this.idPavimento = idPavimento;
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
