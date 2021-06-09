package br.edu.insper.desagil.backend.model;

import java.util.Date;
import br.edu.insper.desagil.backend.core.firestore.FirestoreAutokeyEntity;

public class Documento extends FirestoreAutokeyEntity {

	private String obra;			// Guarda o id da obra a qual se refere
	private String titulo;			// Será exibido pelo front-end
	private String descricao; 		// Breve descrição sobre o que se trata o documento 
	private String url;				// Link para acessarmos o documento
	private String dataCriacao;		// frontEnd -- fixo
	
	public Documento() {
		super();
		Date date = new Date();
		this.dataCriacao = date.toString();
	}
	
	public Documento(String obra, String titulo, String descricao, String url) {
		super();
		this.obra = obra;
		this.titulo = titulo;
		this.descricao = descricao;
		this.url = url;
		
		Date date = new Date();
		this.dataCriacao = date.toString();		
	}
	
	public String getObra() {
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


}
