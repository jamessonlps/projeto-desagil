package br.edu.insper.desagil.backend.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Documento {
	private int id;			// Vamos acessar o documento pela id
	private String titulo;	// Será exibido pelo front-end
	private String url;		// Link para acessarmos o documento
	private Date dataCriacao;		// frontEnd
	private Date ultimaModificacao;	// frontEnd	
	private List<Observacao> observacoes;	// frontEnd
	
	public Documento(int id, String titulo, String url) {
		super();
		this.id = id;
		this.titulo = titulo;
		this.url = url;
//		this.dataCriacao =;
		this.observacoes = new ArrayList<Observacao>();
//		this.ultimaModificacao =;
	
	}
	
	public int getId() {
		return id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Date getUltimaModificacao() {
		return ultimaModificacao;
	}

	public void setUltimaModificacao(Date ultimaModificacao) {
		this.ultimaModificacao = ultimaModificacao;
	}

	public String getTitulo() {
		return titulo;
	}

	public Date getDataCriacao() {
		return dataCriacao;
	}

	public List<Observacao> getObservacoes() {
		return observacoes;
	}
	
	public void addObservacao(Observacao obs) {
		this.observacoes.add(obs);
	}
	
}
