package br.edu.insper.desagil.backend.api;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import br.edu.insper.desagil.backend.core.Endpoint;
import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.exception.DBException;
import br.edu.insper.desagil.backend.core.exception.DatabaseRequestException;
import br.edu.insper.desagil.backend.db.ObservacaoDAO;
import br.edu.insper.desagil.backend.model.Observacao;

public class ObservacaoEndpoint extends Endpoint<Observacao> {
	public ObservacaoEndpoint() {
		super("/observacao");
	}
	
	
	@Override
	public Observacao get(Map<String, String> args) throws APIException {
		ObservacaoDAO dao = new ObservacaoDAO();
		Observacao observacao;
		try {
			observacao = dao.retrieve(args.get("key"));
		} catch (DBException exception) {
			throw new DatabaseRequestException(exception);
		}
		return observacao;
	}	
	
	@Override 
	public List<Observacao> getList(Map<String, String> args) throws APIException {
		List<Observacao> documentos;
		ObservacaoDAO dao = new ObservacaoDAO();
		String arg = args.get("observacoes");
		List<String> codigos = split(arg,  ",");
		
		try {
			documentos = dao.retrieve(codigos);
		} catch (DBException exception) {
			throw new DatabaseRequestException(exception);
		}
		
		return documentos;
		
	}
	
	@Override
	public Map<String, String> post(Map<String, String> args, Observacao observacao) throws APIException {
		ObservacaoDAO dao = new ObservacaoDAO();
		Date date;
		try {
			
			date = dao.create(observacao);
		} catch (DBException exception) {
			throw new DatabaseRequestException(exception);
		}
		
		
		Map<String, String> response = new HashMap<>();
		response.put("date", date.toString());
		response.put("key", observacao.getKey());
		
		return response;

	}
	
	@Override
	public Map<String, String> put(Map<String, String> args, Observacao observacao) throws APIException {
		ObservacaoDAO dao = new ObservacaoDAO();
		Date date;
	    try {
	        date = dao.update(observacao);
	    } catch (DBException exception) {
	    	throw new DatabaseRequestException(exception);
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    return body;
	}
	
	@Override
	public Map<String, String> delete(Map<String, String> args) throws APIException {
		ObservacaoDAO dao = new ObservacaoDAO();
		Date date;
	    try {
	        date = dao.delete(args.get("key"));
	    } catch (DBException exception) {
	    	throw new DatabaseRequestException(exception);
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    return body;
	}
}
