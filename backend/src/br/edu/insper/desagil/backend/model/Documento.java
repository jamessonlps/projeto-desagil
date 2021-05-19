package br.edu.insper.desagil.backend.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Documento {
	private String titulo;
	private String url;
	private Date dataCriacao;
	private Date ultimaModificacao;
	private List<Observacao> observacoes;
	
	public Documento(String titulo, String url) {
		super();
		this.titulo = titulo;
		this.url = url;
//		this.dataCriacao =;
		this.observacoes = new ArrayList();
//		this.ultimaModificacao =;
	
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
