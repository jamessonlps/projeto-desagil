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
import br.edu.insper.desagil.backend.db.SetorDAO;
import br.edu.insper.desagil.backend.model.Observacao;
import br.edu.insper.desagil.backend.model.Setor;

public class SetorEndpoint extends Endpoint<Setor> {
	public SetorEndpoint() {
		super("/setor");
	}
	
	@Override
	public Setor get(Map<String, String> args) throws APIException {
		SetorDAO dao = new SetorDAO();
		Setor setor;
		try {
			setor = dao.retrieve(args.get("key"));
		} catch (DBException exception) {
            throw new DatabaseRequestException(exception);
		}
		return setor;
	}	
	
	@Override 
	public List<Setor> getList(Map<String, String> args) throws APIException {
		List<Setor> setores;
		SetorDAO dao = new SetorDAO();
		String arg = args.get("setores");
		List<String> codigos = split(arg,  ",");
		
		try {
			setores = dao.retrieve(codigos);
		} catch (DBException exception) {
			throw new DatabaseRequestException(exception);
		}
		
		return setores;
		
	}
	
	@Override
	public Map<String, String> post(Map<String, String> args, Setor setor) throws APIException {
		SetorDAO dao = new SetorDAO();
		Date date;
		try {
			date = dao.create(setor);
		} catch (DBException exception) {
            throw new DatabaseRequestException(exception);
		}
		
		Map<String, String> body = new HashMap<>();
		body.put("date", date.toString());
		body.put("key",  setor.getKey());
		
		return body;

	}
	
	@Override
	public Map<String, String> put(Map<String, String> args, Setor setor) throws APIException {
		SetorDAO dao = new SetorDAO();
		Date date;
	    try {
	        date = dao.update(setor);
	    } catch (DBException exception) {
            throw new DatabaseRequestException(exception);
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    return body;
	}
	
	@Override
	public Map<String, String> delete(Map<String, String> args) throws APIException {
		SetorDAO dao = new SetorDAO();
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
