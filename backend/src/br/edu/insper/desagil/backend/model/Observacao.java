package br.edu.insper.desagil.backend.model;

import java.util.Date;

import br.edu.insper.desagil.backend.core.firestore.FirestoreAutokeyEntity;

public class Observacao extends FirestoreAutokeyEntity{
	private boolean alerta;
	private String texto;
	private String dataCriacao;
	private String ultimaModificacao;
	
	public Observacao() {
		super();
		this.alerta = false;
		Date data = new Date();
		this.dataCriacao = data.toString();
		this.ultimaModificacao = data.toString();
	}
	
	public Observacao(String texto, boolean alerta) {
		super();
		this.alerta = alerta;
		this.texto = texto;
		Date data = new Date();
		this.dataCriacao = data.toString();
		this.ultimaModificacao = data.toString();
	}
	
	public boolean isAlerta() {
		return alerta;
	}
	public void setAlerta(boolean alerta) {
		this.alerta = alerta;
	}
	public String getTexto() {
		return texto;
	}
	public void setTexto(String texto) {
		this.texto = texto;
	}
	public String getUltimaModificacao() {
		return ultimaModificacao;
	}
	public void setUltimaModificacao(String ultimaModificacao) {
		this.ultimaModificacao = ultimaModificacao;
	}

	public String getDataCriacao() {
		return dataCriacao;
	}
		
	

}
