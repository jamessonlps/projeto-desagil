package br.edu.insper.desagil.backend.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import br.edu.insper.desagil.backend.core.firestore.FirestoreEntity;

public class Documento extends FirestoreEntity {
	private int codigo;			// Vamos acessar o documento pela id
	private int obra;			// Guarda o id da obra a qual se refere
	private String titulo;		// Ser� exibido pelo front-end
	private String descricao; 	// Breve descri��o sobre o que se trata o documento 
	private int referencia; 	// id do Pavimento / Apartamento a que o documento se refere.
	private String url;			// Link para acessarmos o documento
	private String dataCriacao;				// frontEnd -- fixo
	private List<Observacao> observacoes;	// frontEnd
	
	public Documento() {
		super();
		Date date = new Date();
		this.dataCriacao = date.toString();
	}
	
	public Documento(int codigo, int obra, String titulo, String descricao, String url) {
		super();
		this.codigo = codigo;
		this.obra = obra;
		this.titulo = titulo;
		this.descricao = descricao;
		this.url = url;
		
		Date date = new Date();
		this.dataCriacao = date.toString();		
		this.observacoes = new ArrayList<Observacao>();
	}
	
	public int getCodigo() {
		return codigo;
	}

	public int getObra() {
		return obra;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDataCriacao() {
		return dataCriacao;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public int getReferencia() {
		return referencia;
	}

	public void setReferencia(int referencia) {
		this.referencia = referencia;
	}

	public List<Observacao> getObservacoes() {
		return observacoes;
	}

	public void setObservacoes(List<Observacao> observacoes) {
		this.observacoes = observacoes;
	}

	@Override
	public String key() {
		return Integer.toString(codigo);
	}
	
}
