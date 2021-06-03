package br.edu.insper.desagil.backend.api;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import br.edu.insper.desagil.backend.core.Endpoint;
import br.edu.insper.desagil.backend.core.exception.APIException;
import br.edu.insper.desagil.backend.core.exception.DBException;
import br.edu.insper.desagil.backend.db.SetorDAO;
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
			setor = dao.retrieve(args.get("codigo"));
		} catch (DBException exception) {
			return null;
		}
		return setor;
	}	
	
	@Override
	public Map<String, String> post(Map<String, String> args, Setor setor) throws APIException {
		SetorDAO dao = new SetorDAO();
		Date date;
		try {
			date = dao.create(setor);
		} catch (DBException exception) {
			return null;
		}
		
		Map<String, String> body = new HashMap<>();
		body.put("date", date.toString());
		
		return body;

	}
	
	@Override
	public Map<String, String> put(Map<String, String> args, Setor setor) throws APIException {
		SetorDAO dao = new SetorDAO();
		Date date;
	    try {
	        date = dao.update(setor);
	    } catch (DBException exception) {
	        return null;
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
	        date = dao.delete(args.get("codigo"));
	    } catch (DBException exception) {
	        return null;
	    }
	    Map<String, String> body = new HashMap<>();
	    body.put("date", date.toString());
	    return body;
	}
}
