package br.edu.insper.desagil.backend.model;

import java.util.ArrayList;
import java.util.List;

import br.edu.insper.desagil.backend.core.firestore.FirestoreEntity;

public class Obra extends FirestoreEntity {

	private int codigo; // id da obra
	private String titulo;
	private String endereco;
	private String responsavel;
	
	private List<String> logs;
	private List<String> alertas;

	public Obra() {
		super();
		this.logs = new ArrayList<>();
		this.alertas = new ArrayList<>();
	}
	
	public Obra(int codigo, String titulo) {
		super();
		this.codigo = codigo;
		this.titulo = titulo;
		
		this.logs = new ArrayList<>();
		this.alertas = new ArrayList<>();
		
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

	public List<String> getLogs() {
		return logs;
	}

	public void setLogs(List<String> logs) {
		this.logs = logs;
	}
	
	public void addLog(String log) {
		this.logs.add(log);
	}

	public List<String> getAlertas() {
		return alertas;
	}

	public void setAlertas(List<String> alertas) {
		this.alertas = alertas;
	}

	public int getCodigo() {
		return codigo;
	}

	public String getEndereco() {
		return endereco;
	}

	@Override
	public String key() {
		return Integer.toString(codigo);
	}
}
