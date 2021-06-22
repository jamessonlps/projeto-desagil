package br.edu.insper.desagil.backend.model;

import java.util.ArrayList;
import java.util.List;

import br.edu.insper.desagil.backend.core.firestore.FirestoreAutokeyEntity;

public class Obra extends FirestoreAutokeyEntity  {
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
	
	public Obra(String titulo) {
		super();

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
	
	public void addAlerta(String key) {
		this.alertas.add(key);
	}

	public String getEndereco() {
		return endereco;
	}

}
