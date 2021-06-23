package br.edu.insper.desagil.backend.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import br.edu.insper.desagil.backend.core.firestore.FirestoreAutokeyEntity;

public class Observacao extends FirestoreAutokeyEntity{
	private boolean alerta;					// (front) diferencia observação comum de alertas
	private boolean resolvido;				// (front) diferencia alertas atuais dos resolvidos
	private String dataCriacao;				
	private String ultimaModificacao;		
	private String assunto;
	private String autor;
	private String cargo;
	private List<String> comentarios;

	public Observacao() {
		super();
		this.alerta = false;
		this.resolvido = false;
		
		Date data = new Date();
		this.dataCriacao = data.toString();
		this.comentarios = new ArrayList<>();
	}
	
	public Observacao(String assunto, String autor, String cargo, boolean alerta) {
		super();
		this.alerta = alerta;
		this.resolvido = false;
		
		this.assunto = assunto;
		this.autor = autor;
		this.cargo = cargo;
		
		Date data = new Date();
		this.dataCriacao = data.toString();
		this.comentarios = new ArrayList<>();
	}

	public boolean isResolvido() {
		return resolvido;
	}

	public void setResolvido(boolean resolvido) {
		this.resolvido = resolvido;
	}

	public boolean isAlerta() {
		return alerta;
	}
	
	public String getAssunto() {
		return assunto;
	}

	public void setAssunto(String assunto) {
		this.assunto = assunto;
	}

	public String getAutor() {
		return autor;
	}

	public String getCargo() {
		return cargo;
	}

	public String getDataCriacao() {
		return dataCriacao;
	}
	
	public String getUltimaModificacao() {
		return ultimaModificacao;
	}
	
	public void atualizaUltimaModificacao() {
		Date novaData = new Date();
		this.ultimaModificacao = novaData.toString();
	}
	
	public List<String> getComentarios() {
		return comentarios;
	}

	public void setComentarios(List<String> comentarios) {
		this.comentarios = comentarios;
	}
}
